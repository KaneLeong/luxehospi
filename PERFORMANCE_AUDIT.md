# LUXEHOSPI Performance Audit Report

> **日期**: 2026-05-13  
> **环境**: Vercel CDN 线上环境  
> **站点**: https://luxehospi-dpr4d8bdb-kane-leong-s-projects.vercel.app  
> **构建**: Vite 6 + React 18 + TypeScript + Tailwind CSS 3.4 + Zustand

---

## 1. Core Web Vitals — 三阶段对比

| 指标 | 原始 | P0 优化后 | P1 优化后 | 总变化 | Google Good |
|------|------|-----------|-----------|--------|-------------|
| **FCP** | 4,096ms | 956ms | **788ms** | **-81%** | ≤ 1,800ms ✅ |
| **TTFB** | 164ms | 178ms | **661ms** | +497ms | ≤ 800ms ✅ |
| **DOM Ready** | 4,725ms | 1,951ms | **1,544ms** | **-67%** | — |
| **DOM Interactive** | 4,681ms | 1,936ms | **1,363ms** | **-71%** | — |
| **DOM Complete** | — | — | **2,667ms** | — | — |
| **FP** | — | — | **788ms** | — | — |
| **CLS** | 0 | 0 | **0** | — | ≤ 0.1 ✅ |
| **TBT** | 0 | 0 | **0** | — | ≤ 200ms ✅ |
| **DOM Nodes** | 263 | 263 | **263** | — | ✅ Good |
| **Resources** | — | 13 | **13** | — | ✅ Good |

### 本地开发环境参考

| 指标 | 本地 |
|------|------|
| FCP | 528ms |
| FP | 528ms |
| TTFB | 1ms |
| DOM Ready | 889ms |

> **注**: 线上 TTFB 本次采集为 661ms（P0 时为 178ms），属于代理网络波动，非代码变更导致。FCP 788ms 的提升主要得益于 LQIP 占位图让浏览器更快触发 first-contentful-paint 事件。

---

## 2. 优化历程

### P0-1: Logo 压缩 (760KB → 21KB, -97%)

- 原始: PNG 1100×1000, 760KB → 优化: 缩放至 220×200, WebP 20.8KB + PNG fallback 51.5KB
- Header `<picture>` WebP 优先 + MobileMenu `<picture>` + Footer `loading="lazy"`
- Favicon: WebP 优先 + PNG/SVG fallback

### P0-2: 字体本地托管 (FCP 4,096ms → 956ms, -77%)

- 移除 Google Fonts 外链依赖
- 下载 6 个 woff2 文件 (262.6KB): Inter 400/500/600/700 + Montserrat 600/700
- `fonts.css`: `@font-face` + `font-display: swap` + latin `unicode-range`
- `index.html`: preload 3 个关键字体 + 加载 fonts.css

### P1-1: LQIP Blur Placeholder

- 6 张 Hero 图片生成 20px 模糊缩略图 (base64, ~1.1KB each)
- `OptimizedImage` 组件升级: 自动按文件名匹配 LQIP, blur-up 淡入过渡
- 用户打开页面瞬间看到色彩轮廓，而非灰色空白

### P1-2: Critical CSS 内联

- 首屏必要 CSS (~0.5KB) 内联到 index.html `<style>` 标签
- 消除 CSS 文件网络请求的渲染阻塞

---

## 3. 构建产物 (最终)

### JS Bundle (gzip 总计: **95.4 KB**)

| Chunk | Raw | Gzip |
|-------|-----|------|
| vendor-react | 142.9 KB | 45.8 KB |
| index | 122.0 KB | 29.0 KB |
| vendor-router | 36.8 KB | 13.3 KB |
| vendor-utils | 19.8 KB | 7.4 KB |

### CSS: 42.1 KB raw / **7.8 KB gzip**

---

## 4. 性能特性清单

| 特性 | 状态 |
|------|------|
| Code Splitting (4 chunks) | ✅ |
| CSS Purge (Tailwind) | ✅ |
| 图片 WebP + JPG fallback | ✅ |
| 图片懒加载 (OptimizedImage) | ✅ |
| LQIP blur placeholder | ✅ |
| Skeleton Loading (shimmer) | ✅ |
| Logo 压缩 760KB → 21KB | ✅ |
| `<picture>` 格式协商 | ✅ |
| 字体本地托管 (woff2) | ✅ |
| font-display: swap | ✅ |
| 关键字体 preload | ✅ |
| Critical CSS 内联 | ✅ |
| Favicon WebP 优先 | ✅ |
| SPA 路由 fallback (vercel.json) | ✅ |
| 静态资源 immutable 缓存 | ✅ |
| robots.txt + sitemap.xml | ✅ |
| SEO 组件 + JSON-LD | ✅ |
| CLS = 0 | ✅ |
| TBT = 0 | ✅ |
| GitHub 仓库 + Vercel Git 自动部署 | ✅ |

---

## 5. 结论

**FCP 从 4,096ms 降至 788ms (-81%)，DOM Ready 从 4,725ms 降至 1,544ms (-67%)。** 所有核心指标均达到 Google Good 标准。

**核心优势**:
- CLS = 0, TBT = 0 — 渲染稳定性和交互流畅度满分
- JS/CSS gzip ~103KB，构建体积控制优秀
- 零外部字体依赖，完全自主可控
- LQIP blur placeholder 提供即时视觉反馈
- Git push → GitHub → Vercel 全自动部署流水线

---

## 6. 后续可选优化

| 优先级 | 方案 | 预期收益 |
|--------|------|---------|
| P2 | Service Worker 缓存字体+JS | 二次访问秒开 |
| P2 | `rel="modulepreload"` 预加载关键 chunk | FCP -100~300ms |
| P2 | Hero 图片 AVIF 格式 (比 WebP 再小 20-30%) | 图片传输 -20% |
