/* LIKES */
function toggleLike() {
  var btn     = document.getElementById('like-btn');
  var countEl = document.getElementById('like-count');
  if (!btn || !countEl) return;

  var liked = localStorage.getItem(POST_KEY + '_liked');
  var count = parseInt(countEl.textContent) || 0;

  if (liked) {
    localStorage.removeItem(POST_KEY + '_liked');
    btn.classList.remove('liked');
    btn.querySelector('.like-heart').textContent = '♡';
    countEl.textContent = Math.max(0, count - 1);
  } else {
    localStorage.setItem(POST_KEY + '_liked', '1');
    btn.classList.add('liked');
    btn.querySelector('.like-heart').textContent = '♥';
    countEl.textContent = count + 1;
  }
}

/* Restore like state on load */
(function restoreLike() {
  if (localStorage.getItem(POST_KEY + '_liked')) {
    var btn = document.getElementById('like-btn');
    if (!btn) return;
    btn.classList.add('liked');
    btn.querySelector('.like-heart').textContent = '♥';
  }
})();


/* COMMENTS */
function getComments() {
  try {
    return JSON.parse(localStorage.getItem(POST_KEY + '_comments') || '[]');
  } catch(e) { return []; }
}

function saveComments(arr) {
  localStorage.setItem(POST_KEY + '_comments', JSON.stringify(arr));
}

/* Build HTML for a single dynamic comment (with delete btn) */
function commentHTML(c, idx) {
  return (
    '<div class="comment-item" data-idx="' + idx + '">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<div class="comment-author">' + escHtml(c.author || 'anonymous') + ' · ' + escHtml(c.date) + '</div>' +
        '<button onclick="deleteComment(' + idx + ')" style="' +
          'background:none;border:none;font-family:var(--mono);font-size:9px;' +
          'color:var(--text4);cursor:pointer;padding:2px 6px;border-radius:3px;' +
          'transition:color 0.1s;letter-spacing:0.06em;" ' +
          'onmouseover="this.style.color=\'var(--accent-red)\'" ' +
          'onmouseout="this.style.color=\'var(--text4)\'">delete</button>' +
      '</div>' +
      '<div class="comment-text">' + escHtml(c.text) + '</div>' +
    '</div>'
  );
}

function renderComments() {
  var list = document.getElementById('comments-list');
  if (!list) return;

  var comments = getComments();

  if (comments.length === 0) {
    list.innerHTML = '<p style="font-family:var(--mono);font-size:11px;color:var(--text4);padding:16px 0;" id="no-comments">no comments yet.</p>';
  } else {
    list.innerHTML = comments.map(function(c, i) {
      return commentHTML(c, i);
    }).join('');
  }
}

function submitComment() {
  var nameEl = document.getElementById('comment-name');
  var textEl = document.getElementById('comment-text');
  if (!nameEl || !textEl) return;

  var name = nameEl.value.trim();
  var text = textEl.value.trim();
  if (!text) { showToast('write something first'); return; }

  var now     = new Date();
  var dateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  var comments = getComments();
  comments.push({ author: name || 'anonymous', text: text, date: dateStr });
  saveComments(comments);
  renderComments();

  nameEl.value = '';
  textEl.value = '';
  showToast('comment added');
}

function deleteComment(idx) {
  var comments = getComments();
  if (idx < 0 || idx >= comments.length) return;
  comments.splice(idx, 1);
  saveComments(comments);
  renderComments();
  showToast('comment deleted');
}

/* INIT */
renderComments();
