<template>
    <table>
        <tr :key="index" v-for="(item, index) in this.data">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
        </tr>
    </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: {
      type: Array,
      required: true,
    },
  }
};
</script>

<style scoped>
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>