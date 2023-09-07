import { nextTick } from "vue"
/**
    在绑定元素的 attribute 或事件监听器被应用之前调用, 在指令需要附加须要在普通的 v-on 事件监听器前调用的事件监听器时，这很有用
    created() { },
    当指令第一次绑定到元素并且在挂载父组件之前调用
    beforeMount() { },
    在绑定元素的父组件被挂载后调用
    mounted() { },
    在更新包含组件的 VNode 之前调用
    beforeUpdate() { },
    在包含组件的 VNode 及其子组件的 VNode 更新后调用
    updated() { },
    在卸载绑定元素的父组件之前调用
    beforeUnmount() { },
    当指令与元素解除绑定且父组件已卸载时, 只调用一次
    unmounted() { },
 */
// 判断是否在可视区域 (辅助函数)
function elementIsVisibleInViewport(el, partiallyVisible = false) {
  // 第一个参数是element  第二个参数是 是否部分可见也算可见  
  // 设置为false 即有一部份不可见即不可见
  // 设置为true 即部分可见即算是可见
  const {
    top,
    left,
    bottom,
    right
  } = el.getBoundingClientRect();
  const {
    innerHeight,
    innerWidth
  } = window;
  return partiallyVisible ?
    ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
    top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

const directive = {
  // 自定义拖拽指令
  drag: {
    bind: async (el, binding) => {
      // 鼠标距离页面的位置
      let startX = 0
      let startY = 0
      const mt = el.getAttribute('data-marginTop') || 0
      const ml = el.getAttribute('data-marginLeft') || 0

      // 鼠标距离盒子的位置
      let boxX = 0
      let boxY = 0

      // 绑定v-drag指令的元素
      let oDiv = el


      // 绑定v-drag指令的祖先元素(这个祖先元素必须有定位)
      let faDiv = ''
      nextTick(() => {
        // 在祖先元素没有定位的情况下定位到v-drag绑定的元素,如果有定位,那么操作的对象就会自动锁定这个祖先元素
        faDiv = oDiv.offsetParent === document.body ? oDiv : oDiv.offsetParent

        // 设置盒子marginLeft和marginTop的位置
        faDiv.style.marginTop = mt + 'px'
        faDiv.style.marginLeft = ml + 'px'

        oDiv.addEventListener('mousedown', (e) => {
          boxX = e.offsetX
          boxY = e.offsetY
          const moveFn = (e) => {
            startX = e.pageX - boxX < ml ? ml : e.pageX - boxX - (Number(ml))
            startY = e.pageY - boxY < mt ? mt : e.pageY - boxY - (Number(mt))

            // 如果移动超过的200,就添加一个类名,可以通过这个类做一些样式的改变
            if (startX > 200 || startY > 200) {
              oDiv.classList.add('exceed')
            } else {
              oDiv.classList.remove('exceed')
            }

            faDiv.style.postiotion = 'absolute'
            faDiv.style.top = startY - 20 + 'px'
            faDiv.style.left = startX - 20 + 'px'
          }
          oDiv.addEventListener('mousemove', moveFn)
          oDiv.addEventListener('mouseup', () => {
            oDiv.removeEventListener('mousemove', moveFn)
          })
        })
      })
    },
    inserted: function (el, binding) {
      console.log('drag-inserted');
    },
    update: function (el, binding) {
      console.log('drag-update');
    },
    componentUpdated: function (el, binding) {
      console.log('drag-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('drag-unbind');
    }
  },
  // 自定义copy指令
  copy: {
    bind: (el, { value, def }) => {
      el.addEventListener('click', () => {
        // 创建一个表单元素
        const textarea = document.createElement('textarea')
        // 设置这个表单元素的值
        textarea.value = value
        // 设置表单元素为只读
        textarea.readOnly = 'readonly'
        // 设置表单元素的id
        textarea.id = 'textarea'

        // 设置表单元素不可见
        textarea.style.position = 'absolute'
        textarea.style.top = '0px'
        textarea.style.left = '0px'
        textarea.style.zIndex = '999'

        // 将表单元素添加到页面上
        document.body.appendChild(textarea)

        // 设置表单内容选中(只有在页面上才可以选中这个元素)
        textarea.select()

        // 复制选中区域
        document.execCommand('copy');

        // 删除表单元素
        document.body.removeChild(textarea)
      })
    },
    inserted: function (el, binding) {
      console.log('bind-inserted');
    },
    update: function (el, binding) {
      console.log('bind-update');
    },
    componentUpdated: function (el, binding) {
      console.log('bind-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('bind-unbind');
    }
  },
  // 自定义长按指令
  longpress: {
    bind: (el, { value }) => {
      const wait = el.getAttribute('longTime') || 1000
      let timer = 0
      el.addEventListener('mousedown', () => {
        timer = new Date().getTime()
      })
      el.addEventListener('mouseup', () => {
        timer = new Date().getTime() - timer
        if (timer >= wait && value) {
          value()
        }
      })
    },
    inserted: function (el, binding) {
      console.log('longpress-inserted');
    },
    update: function (el, binding) {
      console.log('longpress-update');
    },
    componentUpdated: function (el, binding) {
      console.log('longpress-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('longpress-unbind');
    }
  },
  // 自定义防抖指令
  debounce: {
    bind: (el, binding) => {
      // 防抖时长
      const wait = Number(binding.arg) || 2000
      // 触发方式
      const event = el.getAttribute('event') || 'click'
      // 定时器
      let timer;
      el.addEventListener(event, (e) => {
        // console.log(e);
        if (timer) {
          clearTimeout(timer)
        } else {
          binding.value && binding.value()
        }
        timer = setTimeout(() => {
          binding.value && binding.value()
        }, wait)
      })
    },
    inserted: function (el, binding) {
      console.log('debounce-inserted');
    },
    update: function (el, binding) {
      console.log('debounce-update');
    },
    componentUpdated: function (el, binding) {
      console.log('debounce-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('debounce-unbind');
    }
  },
  // 自定义输入框禁止输入emoji指令
  emoji: {
    bind: (el,) => {
      const type = el.type
      const tageName = el.tagName.toLowerCase()
      // console.log(tageName);
      if (tageName === 'input' || tageName === 'textarea') {
        // emoji正则校验
        var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
        el.addEventListener('input', (e) => {
          e.target.value = e.target.value.replaceAll(regStr, "");
          // console.log(e.target.value);
        })
      }
    },
    inserted: function (el, binding) {
      console.log('emoji-inserted');
    },
    update: function (el, binding) {
      console.log('emoji-update');
    },
    componentUpdated: function (el, binding) {
      console.log('emoji-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('emoji-unbind');
    }
  },
  // 自定义懒加载指令
  lazyLoad: {
    bind: (el, { value }) => {
      let loadingImg = 'https://img.zcool.cn/community/017ccc599d4688a80121ad7bc36541.gif'
      el.src = loadingImg
      window.addEventListener('scroll', (e) => {
        // 判断是否在可视区域中
        let isVisibleArea = elementIsVisibleInViewport(el)
        // true
        if (isVisibleArea) {
          el.src = value
        } else {
          el.src = loadingImg
        }
      })
    },
    inserted: function (el, binding) {
      console.log('lazyLoad-inserted');
    },
    update: function (el, binding) {
      console.log('lazyLoad-update');
    },
    componentUpdated: function (el, binding) {
      console.log('lazyLoad-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('lazyLoad-unbind');
    }
  },
  // 自定义权限校验指令
  premission: {
    bind: (el, binding) => {
      console.log(binding);
      // 模拟用户拥有的权限数组
      const arr = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11]
      // 如果没有权限就将其隐藏掉
      if (!arr.filter(item => item === binding.value).length > 0) {
        nextTick(() => {
          el.parentNode && el.parentNode.removeChild(el)
        })
      }

    },
    inserted: function (el, binding) {
      console.log('premission-inserted');
    },
    update: function (el, binding) {
      console.log('premission-update');
    },
    componentUpdated: function (el, binding) {
      console.log('premission-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('premission-unbind');
    }
  },
  // 自定义页面水印指令
  waterMarker: {
    bind: (el, binding) => {
      const { text, font, textColor, width, heigth } = binding.value
      // 水印文字，父元素，字体，文字颜色
      const addWaterMarker = (str, parentNode, font, textColor, width, height) => {
        var can = document.createElement('canvas')
        parentNode.appendChild(can)
        can.width = width || 200
        can.height = height || 150
        can.style.display = 'none'
        var cans = can.getContext('2d')
        cans.rotate((-20 * Math.PI) / 180)
        cans.font = font || '16px Microsoft JhengHei'
        cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
        cans.textAlign = 'left'
        cans.textBaseline = 'Middle'
        cans.fillText(str, can.width / 10, can.height / 2)
        parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
      }
      addWaterMarker(text, el, font, textColor, width, heigth)
    },
    inserted: function (el, binding) {
      console.log('waterMarker-inserted');
    },
    update: function (el, binding) {
      console.log('waterMarker-update');
    },
    componentUpdated: function (el, binding) {
      console.log('waterMarker-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('waterMarker-unbind');
    }
  },
  // 自定义loading加载指令
  myLoading: {
    bind: (el, binding) => {
      let loading = ''
      let icon = ''
      let style = {}

      // 参数归一化,如果传递的是一个布尔值,就直接赋值给loading,如果不是就表示是一个配置项,根据对应参数配置即可
      if (typeof binding.value === 'boolean') {
        loading = binding.value
      } else if (binding.value instanceof Object) {
        icon = binding.value.icon
        loading = binding.value.loading
        style = binding.value.style
      } else {
        return new Error('请传入boolean 或 object')
      }

      console.log(loading);

      // 设置el的相对定位,使内部的loading元素绝对定位
      el.style.position = 'relative'

      // 如果为true就表示显示loading
      if (loading) {
        let div = document.createElement('div')
        div.className = 'loadingTrue'
        div.backgroundImage = `url(${icon | './assets/images/loading.svg'})`
        //  循环style添加
        for (const [key, value] of Object.entries(style)) {
          div.style[key] = value
        }
        // 添加到对应div中
        el.appendChild(div)
        // 为false就表示隐藏loading
      } else {
        let div = document.querySelector('.loadingTrue')
        el.removeChild(div)
      }
    },
    inserted: function (el, binding) {
      console.log('myLoading-inserted');
    },
    update: function (el, binding) {
      console.log('myLoading-update');
    },
    componentUpdated: function (el, binding) {
      console.log('myLoading-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('myLoading-unbind');
    }
  },
  // 自定义focus自动聚焦指令
  focus: {
    bind: (el) => {
      // 在页面加载完成后自动聚焦
      nextTick(() => {
        // 判断是否为input标签
        if (el.tagName === 'INPUT') {
          // 自动聚焦
          el.focus()
        }
      })
    },
    inserted: function (el, binding) {
      console.log('focus-inserted');
    },
    update: function (el, binding) {
      console.log('focus-update');
    },
    componentUpdated: function (el, binding) {
      console.log('focus-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('focus-unbind');
    }
  },
  // 自定义图片错误处理指令
  errorImage: {
    bind: (el, binding) => {
      let defaultImage = binding.value || 'https://img1.baidu.com/it/u=1425820314,448353262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
      // 在页面加载完成后自动聚焦
      nextTick(() => {
        // 判断是否为img标签
        if (el.tagName === 'IMG') {
          // 监听图片的加载状态
          el.onerror = () => {
            // 如果加载失败就将图片替换为默认图片
            el.src = defaultImage
          }
        }
      })
    },
    inserted: function (el, binding) {
      console.log('errorImage-inserted');
    },
    update: function (el, binding) {
      console.log('errorImage-update');
    },
    componentUpdated: function (el, binding) {
      console.log('errorImage-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('errorImage-unbind');
    }
  },
  // 自定义tooptip提示指令
  tooltip: {
    bind: (el, binding) => {
      nextTick(() => {
        // 目标DOM的坐标信息
        let rect = el.getBoundingClientRect()
        // 设置配置
        let config = {}

        // 如果只传递了一个字符串
        if (typeof binding.value === 'string') {
          config.value = binding.value
        }

        // 创建一个div
        let div = document.createElement('div')
        div.className = "tooltip"
        div.textContent = config.value

        // 创建div的角标
        let triangle = document.createElement('div')
        triangle.className = "triangle"

        // 角标添加到div中
        div.appendChild(triangle)

        // 将提示添加到页面中
        el.appendChild(div)

        // 得到提示的高度,这里+5是因为还有一个小角标 再+15是为了要和目标保持一定的距离
        let tooltipHeight = div.offsetHeight + 5 + 15

        // 如果目标DOM的坐标距离顶端小于tooltip的高度,就将其显示到盒子的下面
        if (rect.top < tooltipHeight) {
          // 设置提示的位置在盒子的下面
          div.style.bottom = "0"
          div.style.transform = `translate(-50%,${tooltipHeight}px)`

          // 设置提交的角标在上面
          triangle.style.top = 0
          triangle.style.borderTop = "5px solid transparent"
          triangle.style.borderBottom = "5px solid #000"
          triangle.style.transform = `translate(-50%,-100%)`
        } else {
          // 设置提示的位置在盒子的上面
          div.style.top = "0"
          div.style.transform = `translate(-50%,${-tooltipHeight}px)`

          // 设置提交的角标在下面
          triangle.style.bottom = 0
          triangle.style.borderBottom = "5px solid transparent"
          triangle.style.borderTop = "5px solid #000"
          triangle.style.transform = `translate(-50%,100%)`
        }

        // 鼠标移入指定元素,显示提示
        el.addEventListener('mouseover', (e) => {
          if (e.target.classList.contains('tooltip')) return
          div.style.opacity = '1'
        })

        // 鼠标移出,隐藏提示
        el.addEventListener('mouseleave', (e) => {
          if (e.target.classList.contains('tooltip')) return
          div.style.opacity = '0'
        })
      })
    },
    inserted: function (el, binding) {
      console.log('tooltip-inserted');
    },
    update: function (el, binding) {
      console.log('tooltip-update');
    },
    componentUpdated: function (el, binding) {
      console.log('tooltip-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('tooltip-unbind');
    }
  },
  // 禁止用户截图,使用快速的在页面上显示马赛克的方式
  mosaic: {
    bind: (el, binding) => {
      // 设置元素的样式
      el.style.overflow = 'hidden'
      el.style.position = 'relative'

      // 创建遮挡div
      let div = document.createElement('div')
      div.classList.add('mosaic')
      // 创将css
      let style = document.createElement('style')
      // 写入动画
      style.innerHTML = `
      @keyframes move {
        to {
          transform: rotate(45deg) translate(2600%, -50%);
        }
      }`
      // style添加到页面中
      document.getElementsByTagName('head')[0].appendChild(style);

      // 遮挡div添加到盒子中
      el.appendChild(div)
    },
    inserted: function (el, binding) {
      console.log('tooltip-inserted');
    },
    update: function (el, binding) {
      console.log('tooltip-update');
    },
    componentUpdated: function (el, binding) {
      console.log('tooltip-componentUpdated');
    },
    unbind: function (el, binding) {
      console.log('tooltip-unbind');
    }
  }
}
export default directive