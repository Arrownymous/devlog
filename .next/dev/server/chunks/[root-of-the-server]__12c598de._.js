module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/subscribe/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(req) {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid email address.'
        }, {
            status: 400
        });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'server misconfiguration.'
        }, {
            status: 500
        });
    }
    try {
        // 1. Add to Resend Audience (optional but recommended)
        const audienceId = process.env.RESEND_AUDIENCE_ID;
        if (audienceId) {
            await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    unsubscribed: false
                })
            });
        }
        // 2. Send welcome email
        const from = `${process.env.RESEND_SENDER_NAME ?? 'Arrownymous'} <${process.env.RESEND_SENDER_EMAIL ?? 'onboarding@resend.dev'}>`;
        const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from,
                to: [
                    email
                ],
                subject: 'you\'re subscribed to the devlog',
                html: `
          <div style="background:#0a0a0a;color:#e8e8e8;font-family:'IBM Plex Mono',monospace;font-size:13px;line-height:1.8;max-width:480px;margin:0 auto;padding:40px 32px;border:1px solid #222;">
            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#ff4d00;margin-bottom:20px;">// new subscriber</div>
            <div style="font-family:'Space Mono',monospace;font-size:20px;font-weight:700;margin-bottom:16px;">welcome to the devlog.</div>
            <p style="color:#666;margin-bottom:16px;">
              You're now subscribed to <strong style="color:#e8e8e8;">Arrownymous — Devlog</strong>.<br/>
              You'll hear from me when there's a new entry, milestone, or update worth sharing.
            </p>
            <p style="color:#666;margin-bottom:32px;">
              Currently deep in <strong style="color:#e8e8e8;">Inkwell</strong>. More soon.
            </p>
            <div style="border-top:1px solid #222;padding-top:20px;font-size:10px;color:#333;display:flex;align-items:center;gap:8px;">
              <span style="color:#ff4d00;">→</span>
              <span>you signed up at arrownymous.dev</span>
              <span style="display:inline-block;width:8px;height:12px;background:#666;"></span>
            </div>
          </div>
        `
            })
        });
        if (!emailRes.ok) {
            const err = await emailRes.json();
            console.error('Resend error:', err);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'failed to send welcome email.'
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'something went wrong.'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12c598de._.js.map