<template>
  <div 
    class="w-8 h-8 rounded flex items-center justify-center"
    :class="iconClass"
  >
    <span class="text-xs font-medium uppercase">{{ fileExtension }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  fileName: string;
}>();

const fileExtension = computed(() => {
  const ext = props.fileName.split('.').pop()?.toLowerCase() || '';
  return ext.slice(0, 3);
});

const iconClass = computed(() => {
  const ext = fileExtension.value;
  const classMap: Record<string, string> = {
    'js': 'bg-yellow-100 text-yellow-700',
    'ts': 'bg-blue-100 text-blue-700',
    'vue': 'bg-green-100 text-green-700',
    'jsx': 'bg-blue-100 text-blue-700',
    'tsx': 'bg-blue-100 text-blue-700',
    'css': 'bg-pink-100 text-pink-700',
    'scs': 'bg-pink-100 text-pink-700',
    'les': 'bg-pink-100 text-pink-700',
    'htm': 'bg-orange-100 text-orange-700',
    'md': 'bg-gray-100 text-gray-700',
    'json': 'bg-purple-100 text-purple-700',
    'yml': 'bg-gray-100 text-gray-700',
    'png': 'bg-indigo-100 text-indigo-700',
    'jpg': 'bg-indigo-100 text-indigo-700',
    'gif': 'bg-indigo-100 text-indigo-700',
    'svg': 'bg-indigo-100 text-indigo-700',
  };

  return classMap[ext] || 'bg-gray-100 text-gray-700';
});
</script>