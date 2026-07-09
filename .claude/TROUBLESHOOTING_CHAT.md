# 🔧 Troubleshooting - Chat IA no funciona en Vercel

## 🚨 Error Reportado
```
Disculpa, tuve un problema procesando tu pregunta. Por favor, intenta de nuevo 
o llama al Call Center 800 622 0800.
Error al conectar con el asistente
```

---

## ✅ Checklist de Diagnóstico

### 1️⃣ Verificar Configuración en Vercel

**Accede a:** [Dashboard Vercel](https://vercel.com) → Tu Proyecto → Settings → Environment Variables

**Busca:**
- [ ] Variable: `OPENAI_API_KEY`
- [ ] Valor: Tu clave de OpenAI (debe empezar con `sk-proj-`)
- [ ] Ambiente: Production ✓ Preview ✓ Development ✓

**Si no está o no es correcta:**
```
1. Elimina la variable actual (si existe)
2. Agrega NUEVA variable:
   - Name: OPENAI_API_KEY
   - Value: sk-proj-... (tu clave)
   - Environments: Selecciona todas (Production, Preview, Development)
3. Haz clic en "Save"
4. Vuelve a hacer deploy
```

---

### 2️⃣ Verificar la API Key de OpenAI

**Accede a:** [OpenAI API Keys](https://platform.openai.com/api/keys)

**Verifica:**
- [ ] La clave existe y está activa (no revocada)
- [ ] Tiene crédito disponible en tu cuenta OpenAI
- [ ] El modelo `gpt-3.5-turbo` está disponible en tu cuenta

**Si hay duda:**
- Copia una **clave NUEVA** desde el dashboard
- Reemplázala en Vercel

---

### 3️⃣ Revisar Logs de Vercel

**Accede a:** Vercel Dashboard → Tu Proyecto → Deployments → Ver logs

**Busca:**
- Mensajes de error específicos
- Si aparece: "API key not provided" → Variable no llegó a Vercel
- Si aparece: "invalid_api_key" → Clave incorrecta o revocada
- Si aparece: "rate_limit_exceeded" → Límite de OpenAI alcanzado

**Copia-pega cualquier error que veas en los logs.**

---

### 4️⃣ Prueba Local vs Production

**Prueba en localhost (local):**
```bash
npm run dev
# Abre http://localhost:3000
# Intenta usar el chat
```

¿Funciona localmente? → Problema es la variable en Vercel  
¿No funciona localmente? → Problema es el `.env.local`

**Si no funciona localmente:**
1. Verifica `.env.local` tiene: `OPENAI_API_KEY=sk-proj-...`
2. Reinicia el servidor: `npm run dev`

---

### 5️⃣ Verificar que el API Route Existe

**En Vercel, abre:** `https://tu-dominio.vercel.app/api/chat` en el navegador

**Deberías ver:**
```json
{"error":"No hay mensajes para procesar"}
```

**Si ves error 404 o "Function not found":**
- El archivo `app/api/chat.ts` no se desplegó correctamente
- Solución: vuelve a hacer deploy

```bash
git add .
git commit -m "Fix: ensure API route deploys"
git push origin main
```

---

## 🔍 Paso a Paso - Solución Recomendada

### Opción A: Variable ENV correctamente (Recomendado)

**1. En Vercel Dashboard:**
```
Settings → Environment Variables
```

**2. Añade variable:**
```
Name: OPENAI_API_KEY
Value: [Tu API key de OpenAI - empieza con sk-proj-]
Environments: ✓ Production ✓ Preview ✓ Development
```

**3. Redeploy:**
```
Deployments → Latest → Redeploy
```

**4. Espera 1-2 minutos**

**5. Prueba en chat**

---

### Opción B: Si aún no funciona

**1. Revoca la clave antigua en OpenAI:**
```
https://platform.openai.com/api/keys
```

**2. Crea UNA CLAVE NUEVA** (cópiala completa)

**3. En Vercel:**
- Reemplaza la variable con la nueva clave
- Redeploy

**4. Espera 2-3 minutos**

**5. Prueba nuevamente**

---

## ❓ Preguntas de Diagnóstico

Responde estas preguntas (me ayuda a debuggear):

1. ¿Funciona el chat en `localhost:3001`?
2. ¿Qué dice exactamente en los logs de Vercel? (copia-pega)
3. ¿Cuándo fue la última vez que abriste la clave en OpenAI?
4. ¿Hay crédito disponible en tu cuenta OpenAI?
5. ¿El nombre de la variable en Vercel es exactamente `OPENAI_API_KEY`?

---

## 📝 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "API key not provided" | Variable no existe en Vercel | Agregar variable con nombre exacto |
| "invalid_api_key" | Clave incorrecta, revocada o expirada | Usar clave nueva de OpenAI |
| "rate_limit_exceeded" | Límite alcanzado | Esperar 1 minuto o aumentar límite en OpenAI |
| "Connection timeout" | Vercel no puede conectar a OpenAI | Problema temporal, reintentar |
| Error 404 en `/api/chat` | Archivo no desplegó | Volver a hacer push |

---

## 🎯 Resumen Rápido

```
✅ Verifica variable en Vercel: OPENAI_API_KEY
✅ Prueba en localhost primero
✅ Revisa logs de Vercel
✅ Si necesaria, crea clave NUEVA en OpenAI
✅ Redeploy en Vercel
✅ Espera 2-3 minutos
✅ Prueba en producción
```

Si después de esto aún no funciona, comparte:
- Screenshot del error en Vercel logs
- Confirmación que la variable existe
- Si funciona en localhost
