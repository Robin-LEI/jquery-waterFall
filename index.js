;
(function($) {
  $.fn.waterFall = function() {
    // 定义gap
    var defaults = {
      gap: 15,
      columnsArr: [],
      findColumn: function() {
        let temp = {}
        temp.min_index = 0
        temp.max_index = 0
        temp.min_value = this.columnsArr[temp.min_index]
        temp.max_value = this.columnsArr[temp.max_index]
        for (let i = 0; i < this.columnsArr.length; i++) {
          // 求最小列高
          if (this.columnsArr[i] < temp.min_value) {
            temp.min_value = this.columnsArr[i]
            temp.min_index = i
          }
          // 求最大列高
          if (this.columnsArr[i] > temp.max_value) {
            temp.max_value = this.columnsArr[i]
            temp.max_index = i
          }
        }
        return temp
      },
    }
    // $this 当前父容器对象
    var _this = $(this)
    // 获取到父容器的宽度
    parentWidth = _this.width()
    // 获取所有的子容器
    var childArr = _this.children()
    // 获取图片的宽度
    subWidth = childArr.width()
    // 获取到多少列
    var columns = Math.floor(parentWidth / subWidth)
    // 排好第一行
    for (let i = 0; i < childArr.length; i++) {
      // 第一行
      if (i < columns) {
        $(childArr[i]).css({
          top: 0,
          left: (subWidth + defaults.gap) * i
        })
        // 把列高存储到数组
        defaults.columnsArr.push($(childArr[i]).height())
      }
    }
    // 先得找出第一行的最小列高
    for (let i = columns; i < childArr.length; i++) {
      let minColumn = defaults.findColumn()
      let top = minColumn.min_value + defaults.gap
      $(childArr[i]).css({
        top: top,
        left: (subWidth + defaults.gap) * minColumn.min_index
      })
      // 更新数组信息
      defaults.columnsArr[minColumn.min_index] = $(childArr[i]).height() + top
    }
    // 设置父容器的高度
    _this.height(defaults.findColumn().max_value)
  }
})(jQuery);