<template>
  <div class="editor-wrap">
    <textarea v-show="!showPreview" v-model="editorText" @input="autosize" class="editor-input" rows="5" placeholder="写点思路吧...."></textarea>
    <div class="preview markdown-body" v-show="showPreview" v-html="previewHTML"></div>
    <div class="bar" :style="{'justify-content': pure ? 'flex-end' : 'space-between'}">
      <span class="tips" v-if="!pure">可用 markdown 编辑</span>
      <div class="action">
        <el-button @click.native="showPreviewHTML" type="primary" size="small">{{ showPreview ? '退出预览' : '预览' }}</el-button>
        <el-button size="small">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import showdown from 'showdown';

export default {
  data() {
    return {
      showPreview: false,
      previewHTML: '',
      editorText: '',
    };
  },
  mounted() {
    this.editorText = this.text;
  },
  methods: {
    autosize(event) {
      const el = event.target;
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = `height: ${el.scrollHeight}px`;
    },
    showPreviewHTML() {
      if (this.pure) return false;
      const markdown = new showdown.Converter();
      this.previewHTML = markdown.makeHtml(this.editorText);
      this.showPreview = !this.showPreview;
    },
  },
  watch: {
    text(val) {
      this.editorText = val;
    },
  },
  props: {
    text: { type: String, default: '' },
    pure: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css");
$primary-color: #F73859;
$divider-color: #E0E0E0;
$border-color: #EEEEEE;
$text-dark-1: #283149;
$text-dark-2: #404B69;
$text-dark-3: #757575;
$text-gray: #C0C4CC;

$size-xs: 480px;
$size-sm: 600px;
$size-md: 840px;
$size-lg: 960px;
$size-xl: 1280px;
$size-2x: 1440px;

.editor-wrap{
  display: inline-block;
  width: calc(100% - 2rem);
  padding: 1rem;
  background: white;
  border: solid 1px $border-color;
  border-radius: 5px;
  .markdown-body{
    min-height: 110px;
    h1, h2{
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
  .editor-input{
    color: $text-dark-1;
    background: transparent;
    border: none;
    width: 100%;
    font-size: 16px;
    line-height: 1.4em;
    resize: none;
    caret-color: $text-dark-3;
    &:hover,&:focus{
      outline: none;
    }
  }
  .bar{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .tips{
      font-size: 14px;
      color: $text-gray;
      font-weight: 300;
    }
  }
}
</style>
