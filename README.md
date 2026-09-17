# Rede de Combate ao Câncer SCRP — Santa Cruz do Rio Pardo SP

Site institucional oficial, moderno, acolhedor e responsivo desenvolvido para a **Rede de Combate ao Câncer SCRP**, com foco em captação de doações, voluntariado e conscientização sobre o câncer.

---

## 🌟 Características do Projeto

- **Arquitetura Front-End Limpa:** Desenvolvido em **HTML5 Semântico**, **CSS3 Moderno** e **JavaScript Puro (Vanilla)** sem dependências pesadas, garantindo carregamento instantâneo e facilidade total de manutenção.
- **Identidade Visual Sofisticada:** Paleta institucional rosa (#880E4F, #AD1457, #C2185B, #F8BBD0, #FFF5F8), equilibrando profissionalismo, respeito e calor humano.
- **Tipografia Hierárquica:**
  - *Dancing Script*: Títulos emocionais e citações de acolhimento.
  - *Montserrat*: Textos institucionais, navegação, botões e formulários para leitura clara.
- **Imagens Reais Institucionais:** Utilização exclusiva das fotos e cartazes fornecidos:
  - `assets/logo.png`: Emblema oficial com transparência e texto circular preservado.
  - `assets/equipe.jpg`: Banner Hero com foto da equipe de voluntárias e overlay de alto contraste.
  - `assets/equipe-rede.jpeg`: Cozinha comunitária solidária na seção "Quem Somos".
  - `assets/carrossel-rede-01.png` e `assets/carrossel-rede-02.png`: Materiais gráficos de campanha (+37 anos e O que fazemos).
- **Animações e Acessibilidade:**
  - Hero com revelação suave e progressiva (sem perseguição de scroll).
  - Revelação por scroll via `IntersectionObserver`.
  - Suporte completo a `prefers-reduced-motion`.
  - Carrossel controlado exclusivamente por botões de seta e indicadores (sem drag acidental).
  - Destaque "+35 anos de acolhimento" com animação centralizada (sem movimento lateral).
  - Botão flutuante oficial do WhatsApp com pulsação suave e tooltip acessível.
  - Área de doações interativa com planos sugeridos, valor livre e botão de copiar chave PIX funcional com feedback "PIX copiado!".
  - Formulários de contato e cadastro de voluntários com validação acessível e status em tempo real.

---

## 🚀 Como Executar o Site

Não é necessário instalar nenhum framework ou gerenciador de pacotes (`npm`, `yarn`). O site está pronto para rodar em qualquer navegador web.

### Opção 1 — Direto no Navegador:
1. Abra a pasta `rede-combate-cancer-scrp` (ou a pasta raiz do projeto).
2. Dê um duplo clique no arquivo `index.html`.

### Opção 2 — Via Terminal (Windows PowerShell):
```powershell
# Na pasta do projeto:
Start-Process .\index.html
```

### Opção 3 — Via Live Server no VS Code / Cursor:
- Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

---

## 📁 Estrutura de Arquivos

```text
├── index.html              # Página única completa (Single Page)
├── css/
│   └── style.css           # Design System, variáveis CSS, responsividade e animações
├── js/
│   └── script.js           # Menu mobile, carrossel por setas, cópia do PIX, doações e formulários
└── assets/
    ├── logo.png            # Logotipo oficial limpo e nítido
    ├── equipe.jpg          # Foto institucional da equipe no Hero e galeria
    ├── equipe-rede.jpeg    # Foto das voluntárias na cozinha comunitária
    ├── carrossel-rede-01.png # Cartaz institucional (+37 anos / história)
    └── carrossel-rede-02.png # Cartaz de atuação (o que fazemos)
```

---

## 📌 Placeholders para Dados Oficiais Finais

Em cumprimento estrito às diretrizes de não inventar informações factuais, os seguintes dados estão claramente sinalizados no código para substituição pelos dados cadastrais oficiais da ONG quando disponíveis:

- `[INSERIR CHAVE PIX]` — Campo e botão na seção Doações (`#doacoes`)
- `[INSERIR QR CODE PIX]` — Moldura elegante na seção Doações (`#doacoes`)
- `[INSERIR TELEFONE]` — Seção Contato e Rodapé
- `[INSERIR E-MAIL]` — Seção Contato e Rodapé
- `[INSERIR WHATSAPP]` — Seção Contato, Botão FAB e Rodapé
- `[INSERIR INSTAGRAM]` — Seção Contato e Rodapé

---

## 🌐 Publicação no GitHub Pages

Para publicar online gratuitamente:
1. Crie um repositório no seu GitHub (ex: `rede-cancer-scrp`).
2. Suba o conteúdo desta pasta.
3. No GitHub, vá em **Settings** > **Pages** > **Branch** selecione `main` e a pasta `/ (root)`.
4. Salve. O site estará online com HTTPS gratuito em poucos minutos.
