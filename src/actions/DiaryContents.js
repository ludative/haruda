import request from 'superagent'
import tokenRequest from '@/utils/tokenSuperagent'

import APIS from '@/apis'

export default {
  getDiariesById: async function(searchOption) {
    return new Promise((resolve, reject) =>
      request(APIS.DIARY_CONTENTS.GET.method, APIS.DIARY_CONTENTS.GET.path())
        .query(searchOption)
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  },

  getDiaryById: async function({ id }) {
    return new Promise((resolve, reject) =>
      request(
        APIS.DIARY_CONTENTS.GET_BY_ID.method,
        APIS.DIARY_CONTENTS.GET_BY_ID.path({ id })
      ).end((err, res) => {
        if (err) reject(res.body)
        else resolve(res.body)
      })
    )
  },

  createDiary: async function({ diary }) {
    return new Promise((resolve, reject) =>
      tokenRequest(
        APIS.DIARY_CONTENTS.CREATE.method,
        APIS.DIARY_CONTENTS.CREATE.path()
      )
        .send(diary)
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  },

  updateDiary: async function({ id, diary }) {
    return new Promise((resolve, reject) =>
      tokenRequest(
        APIS.DIARY_CONTENTS.UPDATE.method,
        APIS.DIARY_CONTENTS.UPDATE.path({ id })
      )
        .send(diary)
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  }
}
