## Implementación de Carrusel de Texto y Limpieza en HeroSection.tsx

### 1. Limpieza y Optimización Inicial
*   Eliminar la importación no utilizada de `heroImage`.
*   Verificar que todas las dependencias (`lucide-react`, `framer-motion`, `react-router-dom`) estén correctamente referenciadas para evitar errores de consola.
*   Asegurar que las variables constantes como `heroVideos` y el nuevo array de frases estén definidas fuera del componente para evitar recreaciones innecesarias.

### 2. Funcionalidad del Carrusel de Texto
*   Definir un array `heroPhrases` con frases cautivadoras como:
    *   "el mejor cuidado"
    *   "una experiencia única"
    *   "un toque de elegancia"
    *   "belleza profesional"
*   Añadir un nuevo estado `currentPhrase` para rastrear la frase activa.
*   Implementar un `useEffect` específico (o unificar con el de video) que rote la frase cada 4 segundos, asegurando la limpieza del temporizador con `clearInterval`.

### 3. Animaciones y Efectos Visuales
*   Envolver la frase cambiante en `AnimatePresence` de Framer Motion.
*   Aplicar una animación combinada de:
    *   **Entrada:** Deslizamiento desde abajo (`y: 20 -> 0`) y aparición gradual (`opacity: 0 -> 1`).
    *   **Salida:** Deslizamiento hacia arriba (`y: 0 -> -20`) y desaparición gradual (`opacity: 1 -> 0`).
*   Mantener el estilo de gradiente (`text-gradient italic`) para que la frase resalte visualmente.
*   Ajustar el `layout` para que el cambio de frase no cause saltos bruscos en el resto del contenido.

### 4. Corrección de Errores y Mejores Prácticas
*   Asegurar que los arrays de dependencias de los `useEffect` sean precisos (incluyendo los setters si es necesario, aunque React garantiza su estabilidad).
*   Verificar que el uso de `key` en el mapeo de estadísticas y en las transiciones de `AnimatePresence` sea único y estable.
*   Confirmar que no haya variables `undefined` siendo renderizadas, especialmente en el acceso a los arrays por índice.

## Criterios de Éxito
*   El título principal alternará suavemente entre las frases definidas.
*   La transición será cíclica y fluida.
*   No habrá advertencias ni errores en la consola relacionados con este componente.
*   El código seguirá las convenciones de diseño premium del proyecto.