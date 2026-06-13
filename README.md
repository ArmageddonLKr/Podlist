# Podlist Cultural — Site

## Estrutura de arquivos

```
podlist-site/
├── index.html         ← site principal
├── style.css          ← todos os estilos
├── script.js          ← JavaScript
├── sitemap.xml        ← SEO (atualizar URL quando domínio confirmar)
├── robots.txt         ← SEO
├── fonts/
│   └── nove.ttf       ← fonte de display (títulos)
└── assets/
    ├── logo.png       ← logo PNG com fundo TRANSPARENTE ← SUBSTITUIR
    ├── logo-branco.jpg  ← logo versão fundo branco (provisório)
    ├── logo-roxo.jpg    ← logo versão fundo roxo (provisório)
    ├── logo-pink.jpg    ← logo versão fundo pink (provisório)
    ├── og-image.jpg   ← imagem 1200×630px para compartilhamento social ← CRIAR
    ├── sobre.jpg      ← foto da equipe/estúdio ← SUBSTITUIR
    └── anderson.jpg   ← foto do Anderson Vale ← SUBSTITUIR
```

## ⚠️ Pendências antes de lançar

1. **logo.png** — substituir por versão PNG com fundo transparente (vindo do Anderson)
2. **og-image.jpg** — criar imagem 1200×630px para preview no WhatsApp/redes
3. **sobre.jpg** — foto real da equipe ou estúdio (seção Sobre)
4. **anderson.jpg** — foto do Anderson para seção Equipe
5. **Textos** — ajustar copy de serviços, estatísticas e bio quando Anderson confirmar
6. **Domínio** — atualizar URLs `podlistcultural.com.br` no `sitemap.xml` e meta tags

## Deploy no GitHub Pages

1. Criar repositório `podlistcultural` (público)
2. Push de todos os arquivos para `main`
3. Settings → Pages → Source: `main` / `root`
4. Aguardar ~2 minutos → site no ar em `username.github.io/podlistcultural`

## Apontando domínio .com.br

1. Comprar no **registro.br** com CPF/CNPJ do Anderson
2. GitHub Pages → Custom domain → digitar `podlistcultural.com.br`
3. No painel do registro.br → DNS → adicionar:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME` → `www` → `username.github.io`
4. Aguardar propagação: 24–72h
5. Marcar "Enforce HTTPS" no GitHub Pages

## Google Search Console

1. Acessar search.google.com/search-console
2. Adicionar propriedade `podlistcultural.com.br`
3. Verificar via tag HTML (já tem espaço no `<head>` — linha do `google-site-verification`)
4. Enviar sitemap: `https://podlistcultural.com.br/sitemap.xml`