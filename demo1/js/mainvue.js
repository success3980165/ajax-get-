new Vue({
  el: '#app',
  data: {
    question: '',
    answer: '',
    listData: [],
    apiUrl: 'http://192.168.140.72:8091/',
    url: '',
    val: ''
  },
  created: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      var that = this;
      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) {
        that.getList('');
      } else {
        var tagID = window.location.hash.substr(1);
        that.getByID(tagID)
      }

    },
    getList: function(val) {
      var that = this;
      this.url = this.apiUrl + 'admin/api/sango2/answer/questions?question=' + val;
      $.get(that.url, function(data) {
        var arr = JSON.parse(data);
        arr.forEach(function(item) {
          console.log(item)
          item.hrefVal = 'detail.html#' + item.id;
        })
        that.listData = arr;
        console.log(that.listData);
      })
    },
    getByID: function(tagID) {
      var that = this;
      this.url = this.apiUrl + 'admin/api/sango2/answer/' + tagID;
      $.get(that.url, function(data) {
        var ob = JSON.parse(data)
        that.question = ob.question;
        that.answer = ob.answer;
      })
    }
  }
})