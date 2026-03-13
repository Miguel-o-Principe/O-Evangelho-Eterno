---
description: Como adicionar um novo capítulo ao livro
---

# Adicionar Novo Capítulo

O usuário vai fornecer: **número do capítulo**, **título**, **subtítulo** e o **conteúdo**.

## Passos

1. **Criar o conteúdo MDX** em `src/pages/chapters/content/Chapter<N>.mdx` com o texto do capítulo em Markdown.

2. **Criar o componente da página** em `src/pages/chapters/Chapter<N>.tsx`. Usar como modelo o capítulo anterior (ex: `Chapter6.tsx`). O componente deve incluir:
   - Import do `ChapterMeta` com título, descrição, número e imagem
   - Header visual com imagem de fundo, subtítulo e título
   - Tempo estimado de leitura
   - Conteúdo principal via componente MDX importado
   - `<AmazonCTA />`
   - Footer com navegação (capítulo anterior ← → próximo capítulo ou índice)
   - Botão "Voltar ao topo"

3. **Imagem de fundo**: Se o usuário fornecer, copiar para `public/images/capitulo-<N>-bg.png`. Se não, gerar com `generate_image`.

4. **Registrar a rota** em `src/App.tsx`:
   ```tsx
   import { Chapter<N> } from './pages/chapters/Chapter<N>';
   
   // Adicionar dentro das rotas existentes:
   <Route path="/capitulo/<N>" element={
       <ReaderLayout><Chapter<N> /></ReaderLayout>
   } />
   ```

5. **Adicionar o card no índice** em `src/pages/ChaptersIndex.tsx`. Seguir o padrão existente dos cards:
   ```tsx
   <Link to="/capitulo/<N>" className="group block ...">
       <div className="relative aspect-[3/4] ...">
           <img src="/images/capitulo-<N>-bg.png" ... />
       </div>
       <div>
           <span>Capítulo <NN></span>
           <h3>Título do Capítulo</h3>
       </div>
   </Link>
   ```

6. **Atualizar navegação** do capítulo anterior (ex: `Chapter6.tsx`): mudar o link "próximo" de `/capitulos` para `/capitulo/<N>`.

## Notas
- O `ChapterMeta` cuida automaticamente do SEO (title, description, OG tags)
- Manter o estilo visual consistente com os capítulos existentes
- O tempo de leitura pode ser estimado: ~200 palavras/minuto
