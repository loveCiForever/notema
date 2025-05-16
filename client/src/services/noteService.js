// export async function fetchNote(id) {
//   const res = await fetch(`/api/notes/${id}`);
//   return res.json();
// }

// export async function saveNote(id, data) {
//   return fetch(`/api/notes/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
// }
// src/services/noteService.js

// Một sample data cứng, định dạng giống Editor.js output
var sampleNoteData = {
  time: Date.now(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Đây là tiêu đề ghi chú',
        level: 2
      }
    },
    {
      type: 'paragraph',
      data: {
        text: 'Đoạn văn đầu tiên của ghi chú. Bạn có thể sửa nội dung này.'
      }
    },
    {
      type: 'list',
      data: {
        style: 'unordered',
        items: [
          'Item 1',
          'Item 2',
          'Item 3'
        ]
      }
    }
  ],
  version: '2.25.0'
};

let saved = null;
export async function fetchNote(id) {
  return new Promise(res => setTimeout(() => res(sampleNoteData), 200));
}
export async function saveNote(id, data) {
  return new Promise(res => {
    sampleNoteData = data;      // ← store vào biến
    setTimeout(() => res({ success: true }), 200);
  });
}