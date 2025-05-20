import { onMounted, onUnmounted, shallowRef } from 'vue';

export function useMediaQuery(query: string) {
  const matches = shallowRef<boolean>(false);

  const updateMatch = () => {
    matches.value = window.matchMedia(query).matches;
  };

  onMounted(() => {
    const mediaQuery = window.matchMedia(query);
    updateMatch();

    mediaQuery.addEventListener('change', updateMatch);

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', updateMatch);
    });
  });

  return {
    matches,
  };
}
