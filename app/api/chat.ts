import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// Inicializar cliente de OpenAI con la API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Contexto del sistema para instruir al modelo sobre Hospitales MAC
const SYSTEM_PROMPT = `Eres el Asistente Virtual de Hospitales MAC, una red nacional de hospitales de alta especialidad en México con 25 unidades y más de 3,000 médicos especialistas.

Tu rol es proporcionar información clara y amable sobre:
- Ubicaciones de hospitales MAC (Celaya, Guadalajara, CDMX, Aguascalientes, Puebla, Querétaro, León, Irapuato)
- Servicios disponibles (maternidad, cardiología, pediatría, imagenología, laboratorio, urgencias 24/7, etc.)
- Cómo agendar citas o consultas
- Información sobre promociones y paquetes médicos
- Requisitos de admisión y aseguradoras
- Contacto al Call Center: 800 622 0800 (canal oficial)

IMPORTANTE:
- NO brindas diagnósticos médicos ni recomendaciones de tratamiento
- NO sustituyes consultas médicas reales
- Para emergencias, siempre recomienda marcar 911
- Si el usuario pregunta algo médico específico, sugiere agendar con un especialista
- Sé empático, profesional y conciso
- Usa español de México (tú, vosotros) de forma natural

Datos clave:
- 25 hospitales en México
- +3,000 especialistas certificados
- Urgencias disponibles 24/7
- Call Center: 800 MAC 0800 (8006220800)
- Sitio web: www.hospitalesmac.mx (placeholder)`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    // Validar que la API key esté configurada
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "API key de OpenAI no configurada" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    // Validar que hay mensajes
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No hay mensajes para procesar" },
        { status: 400 }
      );
    }

    // Construir el array de mensajes para OpenAI
    // Incluir el system prompt y luego todos los mensajes del usuario/asistente
    const conversationMessages = [
      {
        role: "system" as const,
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg: ChatMessage) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationMessages,
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extraer la respuesta
    const reply =
      completion.choices[0]?.message?.content ||
      "Disculpa, no pude procesar tu pregunta. Por favor intenta de nuevo.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);

    // Proporcionar error específico si es posible
    let errorMessage = "Error al procesar tu pregunta";
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "Error de configuración del asistente";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Demasiadas solicitudes. Por favor intenta más tarde.";
      }
    }

    return NextResponse.json(
      { error: errorMessage, details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
