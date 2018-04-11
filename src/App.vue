<style media="screen">
html {
	height: 100%;
	overflow: hidden;
	margin: 0;
	padding: 0;
}

body {
	height: 100%;
	overflow: hidden;
	margin: 0;
	padding: 0;
}

.gm-scrollbar.-vertical {
	background-color: #f0f0f0
}


/* horizontal scrollbar track */

.gm-scrollbar.-horizontal {
	background-color: transparent;
}


/* scrollbar thumb */

.gm-scrollbar .thumb {
	background-color: rebeccapurple;
}

.gm-scrollbar .thumb:hover {
	background-color: fuchsia;
}
</style>

<template>
<router-view>
</router-view>
</template>

<script>
export default {
	name: 'APP',
}
</script>
