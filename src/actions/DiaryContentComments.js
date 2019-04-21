import request from '@/utils/tokenSuperagent'
// import tokenRequest from '@/utils/tokenSuperagent'

import APIS from '@/apis'

export default {
  getDiaryContentComments: async function(searchOption) {
    return new Promise((resolve, reject) =>
      request(
        APIS.DIARY_CONTENT_COMMENTS.GET.method,
        APIS.DIARY_CONTENT_COMMENTS.GET.path()
      )
        .query(searchOption)
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  },
  createDiaryComment: async function(comment) {
    return new Promise((resolve, reject) =>
      request(
        APIS.DIARY_CONTENT_COMMENTS.CREATE.method,
        APIS.DIARY_CONTENT_COMMENTS.CREATE.path()
      )
        .send(comment)
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  },
  updateDiaryCommentById: async function({ comment, commentId }) {
    return new Promise((resolve, reject) =>
      request(
        APIS.DIARY_CONTENT_COMMENTS.UPDATE.method,
        APIS.DIARY_CONTENT_COMMENTS.UPDATE.path({ commentId })
      )
        .send({ comment })
        .end((err, res) => {
          if (err) reject(res.body)
          else resolve(res.body)
        })
    )
  },
  deleteDiaryCommentById: async function({ commentId }) {
    return new Promise((resolve, reject) =>
      request(
        APIS.DIARY_CONTENT_COMMENTS.DELETE_BY_ID.method,
        APIS.DIARY_CONTENT_COMMENTS.DELETE_BY_ID.path({ commentId })
      ).end((err, res) => {
        if (err) reject(res.body)
        else resolve(res.body)
      })
    )
  }
}
