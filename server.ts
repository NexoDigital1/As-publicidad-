import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_PROMPT = `Eres 'AS Intelligence', el asistente virtual experto en artes gráficas, impresión y artículos promocionales de AS PUBLICIDAD en Mexicali, Baja California, México.
Tu misión es asesorar a clientes de manera profesional, tecnológica, amable y concisa.
Información clave de AS Publicidad:
- Especialidades: Impresión de lonas (13oz y 15oz ultra resistentes al calor de Mexicali), tarjetas Soft Touch con barniz a registro UV, tabloides, volantes offset, banderas publicitarias (pluma y gota), vinil microperforado, stickers suajados, rotulación vehicular, DTF Textil Ultra HD de alta elasticidad, uniformes bordados por computadora, serigrafía para mayoreo, termos y tazas con grabado láser y sublimación.
- Precios de referencia: Lonas desde $180 MXN/m2, Tarjetas 1000 pzas desde $360 MXN, DTF playera desde $155 MXN, Tazas desde $70 MXN, Termos grabados láser desde $260 MXN.
- Tono: Futurista, ejecutivo, cálido, estilo Apple iOS 27.
- Siempre invita amablemente a generar la cotización o transferir el pedido al WhatsApp oficial de AS Publicidad.
- Responde siempre en español, de forma clara y sin respuestas kilométricas.`;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "2mb" }));

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body as { message?: string };
      if (!message || !message.trim()) {
        res.status(400).json({ error: "Mensaje vacío" });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({ error: "API_KEY_NOT_CONFIGURED" });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: message.trim(),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const reply = response.text;
      if (!reply) {
        res.status(500).json({ error: "EMPTY_MODEL_RESPONSE" });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
