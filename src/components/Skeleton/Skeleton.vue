<template>
  <span class="o-skeleton" aria-hidden="true" />
</template>

<style>
/* a placeholder the size of what is loading: set its width and height where you use it */
.o-skeleton {
  display: block;
  height: 1em;
  border-radius: var(--o-radius-sm);
  background: var(--o-fill-2);
  animation: o-skeleton 1.4s ease-in-out infinite;
}

@keyframes o-skeleton {
  50% {
    opacity: 0.45;
  }
}

/* a loop is not a transition, so --o-duration does not stop it: it is stopped here */
@media (prefers-reduced-motion: reduce) {
  .o-skeleton {
    animation: none;
  }
}
</style>
