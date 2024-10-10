<template>
  <div>
    <a-row justify="center" align="middle" style="height: 30vh;">
      <a-col>
        <a-space direction="vertical">
          <a-input-search
              v-model:value="value"
              placeholder="input github user name"
              enter-button
              @search="onSearch"
              size="large"
              style="width: 500px;"
          />
        </a-space>
      </a-col>
    </a-row>
  </div>
  <div class="list-container">
    <a-list item-layout="vertical" size="large" :data-source="listData" style="width: 80%">
      <template #renderItem="{ item }">
        <a-list-item key="item.title" >
          <template v-if="!loading" #actions>
            <span v-for="({ icon, text }, index) in item.actions" :key="index">
              <component :is="icon" style="margin-right: 8px"></component>
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
                v-if="!loading"
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.href">{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
            {{ item.content }}
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </div>

  <div>
    <!-- "More" Button -->
    <div style="text-align: center; margin-top: 20px;" v-if="listData.length > 0">
      <a-button v-if="!loading" type="primary" @click="loadMore">Load More</a-button>
    </div>
  </div>
</template>
<script>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';

export default {
  name: 'HomePage',
  data() {
    return {
      value:"",
      loading: false,
      listData: [],
      actions: [],
      handleScrollMonitor: false,
      page: 1, // Track the current page for loading more data
      pageSize: 3 // Number of items to load at a time
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    onSearch(value) {

      if(!value || value.trim() === '') {
        this.$message.error("Input cannot be empty")
        return
      }

      this.listData = [];
      this.page = 1; // Reset page when searching
      this.loadMore();
    },
    loadMore() {
      this.loading = true;
      const newData = [];
      for (let i = 0; i < this.pageSize; i++) {
        const starRandom = Math.floor(Math.random() * 100) + 1;
        const likeRandom = Math.floor(Math.random() * 100) + 1;
        const messageRandom = Math.floor(Math.random() * 100) + 1;

        newData.push({
          href: 'https://www.antdv.com/',
          title: `ant design vue part ${this.listData.length + i + 1}`,
          avatar: 'https://joeschmoe.io/api/v1/random',
          description:
              'Ant Design, a design language for background applications, is refined by Ant UED Team.',
          content:
              'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          actions: [
            { icon: StarOutlined, text: starRandom.toString() },
            { icon: LikeOutlined, text: likeRandom.toString() },
            { icon: MessageOutlined, text: messageRandom.toString() }
          ]
        });
      }
      this.listData = [...this.listData, ...newData];
      this.page++;
      this.loading = false;
    },
    showSkeleton() {
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !this.loading) {
        // Load more data when scroll reaches the bottom
        this.loadMore();
      }
    },
  },
  mounted() {
    // Add event listener for scroll to detect when user reaches the bottom of the page
    if (this.handleScrollMonitor) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    if (this.handleScrollMonitor) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
.list-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 让容器至少占满整个视窗高度 */
}
</style>
