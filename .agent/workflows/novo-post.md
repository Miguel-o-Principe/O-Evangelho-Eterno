---
description: Como criar um novo post de blog no projeto
---

# Criar Novo Post de Blog

O usuário vai fornecer: **título**, **descrição** e o **conteúdo** do post (ou um tema para gerar o conteúdo).

## Passos

1. Criar o arquivo `src/posts/<slug-do-titulo>.mdx` com o seguinte formato:

```mdx
export const meta = {
    title: "<Título do Post>",
    description: "<Descrição curta para card e SEO>",
    date: "<YYYY-MM-DD>",
    author: "Miguel, o Príncipe",
    cover: "/images/<slug-da-imagem>.png"
};

# Título

Conteúdo em Markdown...
```

2. **Imagem de capa**: Se o usuário fornecer uma imagem, copiar para `public/images/`. Se não, usar a ferramenta `generate_image` para gerar uma imagem temática e salvá-la em `public/images/`.

3. **Slug**: O nome do arquivo deve ser o título em kebab-case, sem acentos. Ex: "A Graça e a Lei" → `a-graca-e-a-lei.mdx`

4. **Data**: Usar a data atual no formato `YYYY-MM-DD`.

5. O post aparecerá automaticamente na seção de blog em `/capitulos` e será acessível em `/post/<slug>`.

## Notas
- O conteúdo deve ter um tom teológico-filosófico consistente com o livro "O Evangelho Eterno"
- Use Markdown rico: blockquotes, listas, subtítulos, negrito/itálico
- Não é necessário editar nenhum outro arquivo — o sistema carrega os posts automaticamente via `usePosts` hook
