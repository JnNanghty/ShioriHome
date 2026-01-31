<script setup>
import {songs} from "../assets/songs.js";
import {songs_jp} from "../assets/songs_jp.js";
import {computed, nextTick, onMounted, ref, useTemplateRef} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const defaultLang = ref(0) // 0 中文 1 日文
const searchString = ref("");
const tag = ref("")


const getSongFirstLetter = (songName) => {
  if (!songName || songName.length === 0) {
    return '#';
  }

  const firstChar = songName.charAt(0);

  // 英文字母
  if (/[A-Za-z]/.test(firstChar)) {
    return firstChar.toUpperCase();
  }

  // 数字
  if (/[0-9]/.test(firstChar)) {
    return '#';
  }

  // 中文字符 - 使用拼音库获取拼音首字母
  if (/[\u4e00-\u9fa5]/.test(firstChar)) {
    try {
      // 检查拼音库是否可用
      if (typeof window.pinyinPro !== 'undefined' && window.pinyinPro.pinyin) {
        // 使用正确的API：对整个歌名进行处理，获取拼音首字母
        const pinyin = window.pinyinPro.pinyin(songName, {pattern: 'first', toneType: 'none'});
        if (pinyin && pinyin.length > 0) {
          // 获取第一个字符并转为大写
          const firstLetter = pinyin.charAt(0).toUpperCase();
          // 确保返回的是A-Z的字母
          if (/[A-Z]/.test(firstLetter)) {
            return firstLetter;
          }
        }
      } else {
        console.warn('拼音库未加载，pinyinPro对象不存在');
      }
    } catch (e) {
      console.error('拼音库调用失败:', e, '歌名:', songName);
    }

    // 降级方案：如果拼音库不可用，返回#
    return '#';
  }

  // 其他字符
  return '#';
}

function sortSongsByPinyin(songs) {
  return songs.sort((a, b) => {
    try {
      if (typeof window.pinyinPro !== 'undefined' && window.pinyinPro.pinyin) {
        // 使用正确的API获取完整拼音进行排序
        const pinyinA = window.pinyinPro.pinyin(a.name, {pattern: 'all', toneType: 'none'});
        const pinyinB = window.pinyinPro.pinyin(b.name, {pattern: 'all', toneType: 'none'});
        return pinyinA.localeCompare(pinyinB, 'zh-CN', {sensitivity: 'base'});
      }
    } catch (e) {
      console.warn('拼音排序失败，使用降级方案:', e);
    }
    // 降级方案：使用Intl.Collator进行中文排序
    const collator = new Intl.Collator('zh-CN', {sensitivity: 'base', numeric: true});
    return collator.compare(a.name, b.name);
  });
}

const groupSongsByLetter = (songs) => {
  const groups = {};
  songs.forEach(song => {
    const letter = getSongFirstLetter(song.name);
    // 确保字母是大写的A-Z，否则归到#组
    const normalizedLetter = /[A-Z]/.test(letter) ? letter : '#';
    if (!groups[normalizedLetter]) {
      groups[normalizedLetter] = [];
    }
    groups[normalizedLetter].push(song);
  });
  // 对每个分组内的歌曲进行排序
  Object.keys(groups).forEach(letter => {
    groups[letter] = sortSongsByPinyin(groups[letter]);
  });
  return groups;
}

const currentSongsList = computed(() => {
  if (defaultLang.value === 0) {
    return songs;
  } else {
    return songs_jp;
  }
})
const songsByLetter = computed(() => {
  return groupSongsByLetter(currentSongsList.value.filter(item => (item.name.includes(searchString.value) || item.artist.includes(searchString.value)) && item.tag.includes(tag.value)));
})
const tags = computed(() => {
  const _tags = []
  currentSongsList.value.forEach((song) => {
    if (!_tags.includes(song.tag)) {
      _tags.push(song.tag)
    }
  })
  return _tags;
})
onMounted(() => {
  defaultLang.value = 0;
})
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];
const router = useRouter();
const scrollToLetter = (value) => {
  const targetElement = document.getElementById(`section-${value}`);
  const main = document.getElementsByTagName('main');
  if (targetElement) {
    const offsetTop = targetElement.offsetTop; // 减去导航栏高度
    main[0].scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

const handle = () => {
  console.log(songsByLetter.value)
}
const copyText = ref('')
const copyDom = useTemplateRef('copy-dom')
const copy = async (name) => {
  copyText.value = name;
  await nextTick();
  try {
    await navigator.clipboard.writeText(name)
    ElMessage({
      message: '已复制到剪切板',
      type: 'success',
      plain: true
    })
  } catch (e) {
    const selection = window.getSelection();
    const range = document.createRange();
    // 选中目标元素的所有文本
    range.selectNodeContents(copyDom.value);
    // 更新选区
    selection.removeAllRanges();
    selection.addRange(range);
    const result = document.execCommand('copy');
    window.getSelection().removeAllRanges();
    if (result) {
      ElMessage({
        message: '已复制到剪切板',
        type: 'success',
        plain: true
      })
    } else {
      ElMessage({
        message: '复制失败，没有权限',
        type: 'error',
        plain: true
      })
    }
  }
}
</script>

<template>
  <div>
    <span ref="copy-dom" class="hidden-copy-dom">{{ copyText }}</span>
    <h1 class="content-title" @click="handle">歌单</h1>
    <div class="lang-filter">
      <el-button size="large" :type="defaultLang === 0 ? 'primary' : ''" round @click="defaultLang = 0, tag = ''">中文
      </el-button>
      <el-button size="large" :type="defaultLang === 1 ? 'primary' : ''" round @click="defaultLang = 1, tag = ''">日文
      </el-button>
    </div>
    <div class="search-bar">
      <el-input class="search-input" size="large" placeholder="搜索歌名或歌手" v-model="searchString">
        <template #append>
          <el-button>🔍</el-button>
        </template>
      </el-input>
    </div>
    <div class="tag-list">
      <el-button size="large" :type="tag === '' ? 'primary' : ''" round @click="tag = ''">全部</el-button>
      <el-button size="large" :type="tag === item ? 'primary' : ''" round v-for="item in tags" @click="tag = item">
        {{ item }}
      </el-button>
    </div>
    <div class="song-list-wrap">
      <div class="song-list">
        <template v-for="letter in letters">
          <div class="song-list-item my-card"
               :id="index === 0 ? 'section-' + letter : ''"
               @click="copy(item.name)"
               v-for="(item, index) in songsByLetter[letter]">
            <div class="song-name">{{ item.name }}</div>
            <div class="song-artist">{{ item.artist }}</div>
          </div>
        </template>
      </div>

      <div class="letter-filter">
        <div class="letter-text"
             v-for="letter in letters"
             @click="scrollToLetter(letter)"
             :class="{'disabled-letter': !songsByLetter[letter]}">{{ letter }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.song-list-wrap {
  width: 1200px;
  margin: 30px auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.song-list {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 1100px;
}

.song-name {
  color: #2c5aa0;
  font-size: 18px;
  font-weight: bold;
}

.song-artist {
  font-size: 13px;
  margin-top: 10px;
  color: #7db4d4;
}

.letter-filter {
  padding: 5px 2px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  position: sticky;
  z-index: 10;
  top: 0;
  right: 0;
  text-align: center;
  height: fit-content;
}

.letter-text {
  padding: 6px 6px;
  cursor: pointer;
  transition: all .3s ease;
  color: #7db4d4;
  font-size: 14px;
  border-radius: 10px;
}

.letter-text:hover {
  background: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  font-weight: bold;
}

.song-list-item {
  width: 200px;
  height: fit-content;
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(74, 144, 226, 0.1);
}

.disabled-letter {
  color: #ccc;
  cursor: not-allowed;
  opacity: .4;
}

.disabled-letter:hover {
  background: inherit;
  color: #ccc;
  font-weight: inherit;
}

.tag-list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.search-bar {
  width: 600px;
  margin: 20px auto 0 auto;
}

.lang-filter {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.search-input {
}

.hidden-copy-dom {
  position: absolute;
  top: -9999999px;
  left: -99999999px;
  opacity: .1;
}
</style>
