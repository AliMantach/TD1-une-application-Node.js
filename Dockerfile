# ======== STAGE 1 : COMPILATION ========
FROM alpine:3.20 AS builder

# installation des paquets système nécessaires pour la compilation
RUN apk add --no-cache nodejs npm

# chemin de travail
WORKDIR /app

# copie des fichiers du dépôt
COPY . .

# installation des dépendances et build
RUN npm ci && npm run build


# ======== STAGE 2 : EXÉCUTION ========
FROM alpine:3.20 AS runner

# installation de Node.js uniquement pour exécuter le code
RUN apk add --no-cache nodejs npm
# création d’un utilisateur non-root
RUN addgroup -S node && adduser -S node -G node
USER node

# chemin de travail
WORKDIR /app

# copie du build depuis le stage précédent
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/package*.json ./

# installation uniquement des dépendances de production pour installer uniquement les dépendances runtime (comme systeminformation)
RUN npm ci --omit=dev

# commande d’exécution
CMD ["node", "dist/server.js"]
