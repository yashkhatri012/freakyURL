import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";
import BLOCKED_EXTENSIONS from "./utils/blockedExtensions.js";
import UrlModel from "./models/urlModel.js";
import { redis } from "./config/redis.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};


const hasBlockedExtension = (text) => {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return BLOCKED_EXTENSIONS.some((ext) => lowerText.includes(ext));
};

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return false;

    if (
      !parsed.hostname.includes(".") ||
      parsed.hostname.startsWith(".") ||
      parsed.hostname.endsWith(".")
    )
      return false;

    return true;
  } catch {
    return false;
  }
};

app.post("/api/shorten", async (req, res) => {
  try {
    const { longUrl, phrase } = req.body;
    // Validate URL format
    if (!longUrl || !isValidUrl(longUrl)) {
      return res.status(400).json({
        error: "Invalid URL. Only http/https URLs are allowed.",
      });
    }

    if (hasBlockedExtension(longUrl)) {
      return res.status(400).json({
        error: "URLs pointing to executable or document files are not allowed.",
      });
    }

    if (phrase) {
      if (phrase.length > 50) {
        return res.status(400).json({
          error: "Phrase too long (max 50 characters)",
        });
      }
      if (hasBlockedExtension(phrase)) {
        return res.status(400).json({
          error: "Phrases cannot contain file extensions.",
        });
      }
    }

    const shortId = nanoid(6);
    let phraseSlug = shortId;

    if (phrase) {
      const cleanPhrase = slugify(phrase);
      console.log(cleanPhrase);
      if (!cleanPhrase) {
        return res.status(400).json({
          error: " Phrase contains no valid characters",
        });
      }

      phraseSlug = `${cleanPhrase}-${shortId}`;
    }

    const newUrl = await UrlModel.create({
      shortId,
      phraseSlug,
      longUrl,
    });

    console.log(newUrl);

    res.status(201).json({
      slug: newUrl.phraseSlug,
    });
  } catch (err) {
    console.error("Shorten error:", err);

    // Handle rare collision / unique index error
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Generated URL already exists. Please retry.",
      });
    }

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET /api/resolve/slug

app.get("/api/resolve/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Check Redis cache first
    const cachedUrl = await redis.get(slug);
    if (cachedUrl) {
      console.log("REDIS HIT:", slug);

      return res.status(200).json({ longUrl: cachedUrl });
    }

    // Cache miss - fetch from database
    const url = await UrlModel.findOne({
      $or: [{ shortId: slug }, { phraseSlug: slug }],
    });

    if (!url) {
      return res.status(404).json({
        error: "Link not found",
      });
    }
    await redis.set(slug, url.longUrl);
    console.log("Redis set slug");
    url.save().catch(() => {});

    res.status(200).json({ longUrl: url.longUrl });
  } catch (err) {
    console.error("Resolve error:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default app;
