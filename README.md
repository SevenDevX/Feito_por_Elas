# 🍞 Feito por Elas - Comida sem Glúten

Uma plataforma de e-commerce moderna e responsiva para uma padaria especializada em produtos sem glúten, desenvolvida com Next.js 14 e TypeScript.

## ✨ Funcionalidades

### 🛒 Sistema de E-commerce
- **Catálogo de produtos** com categorias organizadas
- **Carrinho de compras** interativo com persistência local
- **Gestão de quantidades** (adicionar, remover, limpar carrinho)
- **Cálculo automático** de totais e subtotais

### 📱 Integração WhatsApp
- **Pedidos via WhatsApp** com mensagem formatada automaticamente
- **Botão flutuante** para contato direto
- **Formulário de contato** integrado com WhatsApp
- **Geração automática** de códigos de rastreamento

### 📦 Sistema de Rastreamento
- **Códigos únicos** gerados automaticamente (formato: FE + timestamp + letras aleatórias)
- **Timeline visual** com status do pedido:
  - 📥 Recebido
  - 👩‍🍳 Em preparo
  - 🚚 Saiu para entrega
  - ✅ Entregue
- **Busca por código** de rastreamento
- **Persistência local** dos pedidos

### 📱 Progressive Web App (PWA)
- **Instalação nativa** em dispositivos móveis e desktop
- **Funcionamento offline** com service worker
- **Cache inteligente** de recursos estáticos
- **Prompt de instalação** automático
- **Ícones otimizados** para diferentes dispositivos

### 🎨 Design e UX
- **Design responsivo** mobile-first
- **Tema personalizado** com cores da marca
- **Animações suaves** e transições
- **Acessibilidade** com ARIA labels e navegação por teclado
- **Dark mode** suportado

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

### Gerenciamento de Estado
- **React Context** - Gerenciamento de estado global
- **useReducer** - Lógica complexa de estado
- **localStorage** - Persistência local

### PWA e Performance
- **Service Worker** - Cache e funcionalidade offline
- **Web App Manifest** - Configurações PWA
- **Otimização de imagens** - Next.js Image
- **Lazy loading** - Carregamento sob demanda

### Fontes
- **Work Sans** - Fonte principal
- **Geist Mono** - Fonte monoespaçada

## 📁 Estrutura do Projeto

\`\`\`
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── produtos/          # Página de produtos
│   └── rastrear/          # Sistema de rastreamento
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── header.tsx        # Cabeçalho com navegação
│   ├── hero.tsx          # Seção hero
│   ├── cart-drawer.tsx   # Carrinho lateral
│   ├── whatsapp-float.tsx # Botão flutuante WhatsApp
│   └── pwa-install-prompt.tsx # Prompt instalação PWA
├── lib/                  # Utilitários e contextos
│   ├── cart-context.tsx  # Contexto do carrinho
│   ├── order-context.tsx # Contexto dos pedidos
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
│   ├── icons/           # Ícones PWA
│   ├── manifest.json    # Manifest PWA
│   └── sw.js           # Service Worker
└── styles/
    └── globals.css      # Estilos globais
\`\`\`

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
\`\`\`bash
git clone <url-do-repositorio>
cd feito-por-elas
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Execute o projeto em desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. **Acesse o projeto**
\`\`\`
http://localhost:3000
\`\`\`

### Scripts disponíveis

\`\`\`bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linting
\`\`\`

## ⚙️ Configuração

### WhatsApp
Para configurar o número do WhatsApp, edite os arquivos:
- `components/whatsapp-float.tsx`
- `components/contact.tsx`
- `components/cart-drawer.tsx`

Substitua `5511999999999` pelo número real no formato internacional.

### PWA
As configurações PWA estão em:
- `public/manifest.json` - Configurações do app
- `public/sw.js` - Service worker
- `app/layout.tsx` - Meta tags PWA

## 🎨 Personalização

### Cores do tema
As cores estão definidas em `app/globals.css`:
- **Primary**: `#d9bf77` (dourado)
- **Foreground**: `#6a4e4c` (marrom)
- **Background**: `#ffffff` (branco)

### Fontes
Configuradas em `app/layout.tsx`:
- **Work Sans** - Fonte principal
- **Geist Mono** - Fonte monoespaçada

## 📱 Funcionalidades PWA

### Instalação
- Prompt automático de instalação
- Suporte a diferentes navegadores
- Ícones otimizados para iOS e Android

### Offline
- Cache de recursos estáticos
- Funcionalidade básica offline
- Sincronização quando online

### Performance
- Carregamento rápido
- Cache inteligente
- Otimização de imagens

## 🔄 Fluxo de Pedidos

1. **Cliente navega** pelos produtos
2. **Adiciona itens** ao carrinho
3. **Finaliza pedido** via WhatsApp
4. **Código de rastreamento** é gerado automaticamente
5. **Mensagem formatada** é enviada via WhatsApp
6. **Cliente pode rastrear** o pedido usando o código

## 🎯 Próximas Funcionalidades

- [ ] Integração com banco de dados
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Pagamentos online
- [ ] Notificações push
- [ ] Sistema de avaliações

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

**Feito por Elas**
- WhatsApp: +55 11 99999-9999
- Email: contato@feitoporelas.com.br
- Website: https://feitoporelas.com.br

---

Desenvolvido com ❤️ para mulheres empreendedoras
