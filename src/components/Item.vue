<template>
  <ul id="item">
    <li>{{ this.title }}</li>
    <li style="float:right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        :fill="this.$store.state.accentColor"
        class="bi bi-chevron-compact-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"
        />
      </svg>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
  props: {
    title: {
      type: String,
      required: true,
    }
  }
};
</script>

<style scoped>

ul {
 list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

ul:hover{
    background-color: #dcdcdc;
}

li {
  display: block;
  padding: 14px 16px;
  text-decoration: none;
  float: left;
}

</style>
