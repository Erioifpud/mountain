import * as Mock from 'mockjs'

Mock.mock('article/', {
  data: {
    'list|1-8': [{
      'id|+1': 1,
      'title': '@paragraph(20)',
      'content': ''
    }]
  }
})