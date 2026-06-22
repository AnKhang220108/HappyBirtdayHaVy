document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử cần thiết một cách an toàn
    const openBtn = document.getElementById('open-calendar');
    const modal = document.getElementById('memory-modal');
    const closeBtn = document.getElementById('close-modal');

    if (!openBtn) return; // Không có nút thì không cần tiếp tục
    if (!modal) return;
    console.log('calendar script initialized, openBtn found:', !!openBtn, 'modal found:', !!modal);

    // Khi bấm vào icon Lịch -> Thêm class 'active' để hiện bảng lên
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('open-calendar clicked');
        closePostGrid();
        modal.classList.add('active');
    });

    // Khi bấm vào dấu X -> Gỡ class 'active' để ẩn bảng đi
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // (Tùy chọn) Nhấn vào vùng đen mờ bên ngoài cũng sẽ đóng bảng
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    const appContainer = document.querySelector('.app-container');
    const openPostGrid = document.getElementById('open-post-grid');
    const postGridScreen = document.getElementById('post-grid-screen');
    const postGridContent = document.getElementById('post-grid-content');

    function closePostGrid() {
        postGridScreen?.classList.remove('active');
        postGridScreen?.setAttribute('aria-hidden', 'true');
        appContainer?.classList.remove('grid-mode');
    }

    function openPostGridScreen() {
        if (!postGridScreen || !postGridContent) return;

        postGridContent.innerHTML = '';
        document.querySelectorAll('.post-item').forEach((post, index) => {
            const postImage = post.querySelector('.post-media img');
            if (!postImage) return;

            const gridButton = document.createElement('button');
            gridButton.className = 'post-grid-item';
            gridButton.type = 'button';
            gridButton.setAttribute('aria-label', `Má»Ÿ post ${index + 1}`);

            const gridImage = document.createElement('img');
            gridImage.src = postImage.currentSrc || postImage.src;
            gridImage.alt = postImage.alt || `Post ${index + 1}`;
            gridButton.appendChild(gridImage);

            gridButton.addEventListener('click', () => {
                closePostGrid();
                post.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            postGridContent.appendChild(gridButton);
        });

        postGridScreen.classList.add('active');
        postGridScreen.setAttribute('aria-hidden', 'false');
        appContainer?.classList.add('grid-mode');
        postGridScreen.scrollTop = 0;
    }

    openPostGrid?.addEventListener('click', () => {
        if (postGridScreen?.classList.contains('active')) {
            closePostGrid();
            return;
        }

        openPostGridScreen();
    });

    const openFriendsOverlay = document.getElementById('open-friends-overlay');
    const friendsOverlay = document.getElementById('friends-overlay');
    const friendsHandle = document.querySelector('.friends-handle');
    let friendsDragStartY = 0;
    let friendsDragOffset = 0;
    let isDraggingFriends = false;

    function showFriendsOverlay() {
        if (!friendsOverlay) return;
        friendsOverlay.style.transform = '';
        friendsOverlay.style.opacity = '';
        friendsOverlay.classList.add('active');
    }

    function hideFriendsOverlay() {
        if (!friendsOverlay) return;
        friendsOverlay.classList.remove('active', 'is-dragging');
        friendsOverlay.style.transform = '';
        friendsOverlay.style.opacity = '';
    }

    function startFriendsDrag(e) {
        if (!friendsOverlay?.classList.contains('active')) return;
        isDraggingFriends = true;
        friendsDragStartY = e.clientY;
        friendsDragOffset = 0;
        friendsOverlay.classList.add('is-dragging');
        friendsHandle?.setPointerCapture?.(e.pointerId);
    }

    function moveFriendsDrag(e) {
        if (!isDraggingFriends || !friendsOverlay) return;
        friendsDragOffset = Math.max(0, e.clientY - friendsDragStartY);
        friendsOverlay.style.transform = `translateY(${friendsDragOffset}px)`;
        friendsOverlay.style.opacity = String(Math.max(0.4, 1 - friendsDragOffset / 420));
    }

    function endFriendsDrag(e) {
        if (!isDraggingFriends || !friendsOverlay) return;
        isDraggingFriends = false;
        friendsOverlay.classList.remove('is-dragging');
        friendsHandle?.releasePointerCapture?.(e.pointerId);

        if (friendsDragOffset > 95) {
            friendsOverlay.style.transform = 'translateY(100%)';
            friendsOverlay.style.opacity = '0';
            setTimeout(hideFriendsOverlay, 220);
            return;
        }

        friendsOverlay.style.transform = '';
        friendsOverlay.style.opacity = '';
    }

    openFriendsOverlay?.addEventListener('click', showFriendsOverlay);
    friendsHandle?.addEventListener('pointerdown', startFriendsDrag);
    friendsHandle?.addEventListener('pointermove', moveFriendsDrag);
    friendsHandle?.addEventListener('pointerup', endFriendsDrag);
    friendsHandle?.addEventListener('pointercancel', endFriendsDrag);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideFriendsOverlay();
            closePostGrid();
        }
    });
const emojiButtons = document.querySelectorAll('.message-icons .icon-btn');

emojiButtons.forEach((button) => {
    button.addEventListener('click', () => {

        const emoji = button.textContent.trim();

        for (let i = 0; i < 6; i++) {

            const floating = document.createElement('div');

            floating.className = 'emoji-fly';
            floating.textContent = emoji;

            // xuất hiện ngẫu nhiên ở đáy màn hình
            const startX = Math.random() * window.innerWidth;

            // hướng bay ngẫu nhiên
            const drift = (Math.random() - 0.5) * 400;

            const size = 40 + Math.random() * 25;
            const duration = 2.5 + Math.random();

            floating.style.left = `${startX}px`;

            floating.style.fontSize = `${size}px`;

            floating.style.setProperty(
                '--drift',
                `${drift}px`
            );

            floating.style.animation =
                `riseUp ${duration}s linear forwards`;

            const app = document.querySelector('.app-container');

            app.appendChild(floating);

            floating.addEventListener('animationend', () => {
                floating.remove();
            });
        }
    });
});

    const openChatListBtn = document.getElementById('open-chat-list');
    const quickMessageInput = document.getElementById('quick-message-input');
    const chatListScreen = document.getElementById('chat-list-screen');
    const closeChatList = document.getElementById('close-chat-list');
    const openFriendChat = document.getElementById('open-friend-chat');
    const chatDetailScreen = document.getElementById('chat-detail-screen');
    const backToChatList = document.getElementById('back-to-chat-list');
    const chatThread = document.getElementById('chat-thread');
    const urgentRow = document.getElementById('urgent-row');
    const typingRow = document.getElementById('typing-row');
    let replyTimer = null;
    let replyTimers = [];
    let hasAutoReply = false;

    const birthdayMessages = [
        'vào ngày 09/07, một em bé siêu đáng yêu đột ngột bước sang tuổi mới 😭💖',
        'Và em bé đó hiện đang là người yêu anh 😌',
        'Chúc mừng sinh nhật em nhaaaa 🎂',
        'Mong em luôn xinh, luôn vui vẻ, tích cực, không gì có thể làm em bé của anh buồn được hết 😘',
        'Và bớt giận anh lại 🥹',
        'Anh biết đôi lúc anh hay nổi nóng, phát cáu với em khiến em buồn,...',
        'Đừng buồn anh vì những lần như thế...',
        'Anh thương em nhiều lắm...',
        'Và cảm ơn em đã chịu đựng và yêu em đến bây giờ...',
        'Vẫn yêu anh nha 😊💕',
        'Nói chung là…',
        'Anh mê em dữ lắm 😭💖',
        'Happy Birthday người anh thươngggg 🎈🫶'
    ];

    function openChatListScreen() {
        closePostGrid();
        chatDetailScreen?.classList.remove('active');
        chatListScreen?.classList.add('active');
    }

    function closeChatScreens() {
        chatListScreen?.classList.remove('active');
        chatDetailScreen?.classList.remove('active');
    }

    function resetTypingMessage() {
        hasAutoReply = false;
        if (replyTimer) {
            clearTimeout(replyTimer);
            replyTimer = null;
        }
        const existingReply = document.getElementById('auto-reply-row');
        existingReply?.remove();
        typingRow?.style.removeProperty('display');
    }

    function showAutoReply() {
        if (!chatThread || !typingRow || hasAutoReply) return;
        hasAutoReply = true;
        typingRow.style.display = 'none';

        const replyRow = document.createElement('div');
        replyRow.id = 'auto-reply-row';
        replyRow.className = 'incoming-row';
        replyRow.innerHTML = `
            <img class="friend-avatar tiny" src="theo.jpg" alt="Bạn bè">
            <div class="incoming-bubble message-bubble">Happy Birthday người anh thương nhất.</div>
        `;
        chatThread.appendChild(replyRow);
        chatThread.scrollTop = chatThread.scrollHeight;
    }

    function resetTypingMessage() {
        hasAutoReply = false;

        if (replyTimer) {
            clearTimeout(replyTimer);
            replyTimer = null;
        }

        replyTimers.forEach((timer) => clearTimeout(timer));
        replyTimers = [];

        // Xóa các tin auto đã render
        document.getElementById('auto-reply-row')?.remove();
        chatThread?.querySelectorAll('.auto-reply-row').forEach((reply) => reply.remove());

        // Xóa các typing clone đang chạy dở
        chatThread?.querySelectorAll('.typing-row-clone').forEach((node) => node.remove());

        // Đảm bảo typing-row gốc không hiển thị
        if (typingRow) typingRow.style.display = 'none';

        if (urgentRow) {
            urgentRow.classList.remove('is-visible', 'urgent-pop');
        }
    }

    function appendAutoReply(message) {
        if (!chatThread) return;
        const replyRow = document.createElement('div');
        replyRow.className = 'incoming-row auto-reply-row message-pop-row';
        replyRow.innerHTML = `
            <img class="friend-avatar tiny" src="theo.jpg" alt="Bạn bè">
            <div class="incoming-bubble message-bubble">${message}</div>
        `;
        chatThread.appendChild(replyRow);
        chatThread.scrollTop = chatThread.scrollHeight;
    }

    function showAutoReply() {
        if (!chatThread || !typingRow || hasAutoReply) return;
        hasAutoReply = true;

        // Đảm bảo typing-row gốc không hiển thị cố định.
        typingRow.style.display = 'none';

        const timers = birthdayMessages.map((message, index) => {
            return setTimeout(() => {
                // Clone typing UI để nó nằm đúng vị trí ngay dưới tin nhắn vừa append.
                const typingClone = typingRow.cloneNode(true);
                typingClone.id = '';
                typingClone.classList.add('typing-row-clone');

                typingClone.style.display = 'flex';

                // Với tin nhắn đầu tiên, đảm bảo typing xuất hiện ngay khi bắt đầu.
                // (showAutoReply đã ẩn typing-row gốc trước đó)
                chatThread.appendChild(typingClone);
                chatThread.scrollTop = chatThread.scrollHeight;

                // đợi typing lâu hơn (khoảng 1s) trước khi hiển thị tin thật
                const showTimer = setTimeout(() => {
                    typingClone.remove();
                    appendAutoReply(message);
                }, 2000);

                replyTimers.push(showTimer);
            }, index * 2250);
        });

        replyTimers.push(...timers);
    }

    function openFriendChatScreen() {
        resetTypingMessage();
        chatListScreen?.classList.remove('active');
        chatDetailScreen?.classList.add('active');

        // Tạo hiệu ứng "đang soạn" ngay khi vào chat (để dòng "TIN KHẨN" cũng có hiệu ứng soạn bên dưới)
        // -> typing-bubble đang có sẵn trong HTML là #typing-row
        if (typingRow && chatThread) {
            if (urgentRow && typingRow.previousElementSibling !== urgentRow) {
                urgentRow.after(typingRow);
            }

            // Đưa typing-row ngay dưới tin nhắn "TIN KHẨN"
            // -> đảm bảo nó hiển thị lại sau reset
            typingRow.style.display = 'flex';

            // Nếu trước đó đã bị clone/xóa, đảm bảo node vẫn nằm trong DOM
            if (!typingRow.isConnected) {
                chatThread.appendChild(typingRow);
            }

            chatThread.scrollTop = chatThread.scrollHeight;
        }

        replyTimer = setTimeout(() => {
            if (typingRow) typingRow.style.display = 'none';

            if (urgentRow) {
                urgentRow.classList.remove('urgent-pop');
                urgentRow.classList.add('is-visible');
                void urgentRow.offsetWidth;
                urgentRow.classList.add('urgent-pop');
            }

            if (chatThread) {
                chatThread.scrollTop = chatThread.scrollHeight;
            }

            const autoReplyTimer = setTimeout(showAutoReply, 850);
            replyTimers.push(autoReplyTimer);
        }, 1250);
    }

    openChatListBtn?.addEventListener('click', openChatListScreen);
    quickMessageInput?.addEventListener('click', openChatListScreen);
    closeChatList?.addEventListener('click', closeChatScreens);
    openFriendChat?.addEventListener('click', openFriendChatScreen);
    backToChatList?.addEventListener('click', openChatListScreen);

    const launchOverlay = document.getElementById('launch-overlay');
    if (launchOverlay) {
        let launchClosing = false;
        launchOverlay.addEventListener('click', () => {
            if (launchClosing) return;
            launchClosing = true;
            launchOverlay.classList.add('hide');
            launchOverlay.addEventListener('animationend', () => {
                launchOverlay.style.display = 'none';
            }, { once: true });
        });
    }

    const musicOverlay = document.getElementById('music-overlay');
    const musicDisc = document.querySelector('.music-disc');
    const musicCover = document.getElementById('music-cover');
    const musicTitle = document.getElementById('music-title');
    const musicArtist = document.getElementById('music-artist');
    const musicPlayer = document.getElementById('music-player');
    const musicSource = document.getElementById('music-source');
    const musicList = document.getElementById('music-list');
    const profileTrigger = document.getElementById('profile-trigger');
    const closeMusic = document.getElementById('close-music');
    let pendingAutoplay = false;

    const playlist = [
        {
            title: 'Có Chắc Yêu Là Đây',
            artist: 'Locket',
            src: 'cochacyeuladay.mp3',
            cover: 'theo.jpg'
        },

        {
            title: 'In The Middle',
            artist: 'Locket',
            src: 'Middle.mp3',
            cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Stay',
            artist: 'Locket',
            src: 'Stay.mp3',
            cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Yêu Em Như...',
            artist: 'Locket',
            src: 'yeuemnhu.mp3',
            cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop'
        },
        
        {
            title: 'Hóa Ra',
            artist: 'Locket',
            src: 'hoara.mp3',
            cover: 'theo.jpg'
        },
        {
            title: 'Track 06 X Nơi Này Có Anh',
            artist: 'Locket',
            src: 'track06.mp3',
            cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
        },
        {
            title: 'Hẹn Gặp Em Dưới Ánh Trăng',
            artist: 'Locket',
            src: 'hengapemduoianhtrang.mp3',
            cover: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=400&auto=format&fit=crop'
        }
        
    ];

    function openMusicOverlay() {
        if (!musicOverlay) return;
        musicOverlay.classList.add('active');
        playMusic();
    }

    function closeMusicOverlay() {
        if (!musicOverlay) return;
        musicOverlay.classList.remove('active');
        updatePlayButton();
    }

    function playMusic() {
        pendingAutoplay = false;
        return musicPlayer.play().catch(() => {
            pendingAutoplay = true;
            updatePlayButton();
        });
    }

    function retryAutoplay() {
        if (!pendingAutoplay || !musicPlayer.paused) return;
        playMusic();
    }

    function selectTrack(track, index, shouldPlay = true) {
        if (index !== undefined) currentTrackIndex = index;
        musicCover.src = track.cover;
        musicTitle.textContent = track.title;
        musicArtist.textContent = track.artist;
        musicSource.src = track.src;
        musicPlayer.load();
        if (shouldPlay) {
            playMusic();
        }
        updateActiveTrack();
        updatePlayButton();
    }

    function updateActiveTrack() {
        if (!musicList) return;
        musicList.querySelectorAll('.music-item').forEach((item) => {
            item.classList.toggle('active', Number(item.dataset.index) === currentTrackIndex);
        });
    }

    function renderPlaylist() {
        if (!musicList) return;
        musicList.innerHTML = playlist.map((track, index) => `
            <button class="music-item${index === currentTrackIndex ? ' active' : ''}" data-index="${index}">
                <div class="music-item-thumb" style="background-image:url('${track.cover}')"></div>
                <div class="music-item-meta">
                    <strong>${track.title}</strong>
                    <span>${track.artist}</span>
                </div>
            </button>
        `).join('');

        musicList.querySelectorAll('.music-item').forEach((item) => {
            item.addEventListener('click', () => {
                const idx = Number(item.dataset.index);
                selectTrack(playlist[idx], idx);
            });
        });
    }

    if (profileTrigger) {
        profileTrigger.addEventListener('click', openMusicOverlay);
    }

    if (closeMusic) {
        closeMusic.addEventListener('click', closeMusicOverlay);
    }

    if (musicOverlay) {
        musicOverlay.addEventListener('click', (e) => {
            if (e.target === musicOverlay) {
                closeMusicOverlay();
            }
        });
    }

    // Custom player controls
    const musicPlayBtn = document.getElementById('music-play');
    const musicPrevBtn = document.getElementById('music-prev');
    const musicNextBtn = document.getElementById('music-next');
    const musicSeek = document.getElementById('music-seek');
    const musicTime = document.getElementById('music-time');
    const musicDuration = document.getElementById('music-duration');

    let currentTrackIndex = 0;

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function updatePlayButton() {
        if (!musicPlayBtn) return;
        if (musicPlayer.paused) {
            musicPlayBtn.textContent = '▶';
        } else {
            musicPlayBtn.textContent = '❚❚';
        }
        if (musicDisc) {
            musicDisc.classList.toggle('is-playing', !musicPlayer.paused);
        }
        musicPlayBtn.classList.toggle('is-playing', !musicPlayer.paused);
        musicPlayBtn.setAttribute('aria-label', musicPlayer.paused ? 'Phát nhạc' : 'Tạm dừng');
    }

    if (musicPlayBtn) {
        musicPlayBtn.addEventListener('click', () => {
            if (musicPlayer.paused) {
                playMusic();
            } else {
                musicPlayer.pause();
            }
            updatePlayButton();
        });
    }

    if (musicPrevBtn) {
        musicPrevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            selectTrack(playlist[currentTrackIndex], currentTrackIndex);
        });
    }

    if (musicNextBtn) {
        musicNextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            selectTrack(playlist[currentTrackIndex], currentTrackIndex);
        });
    }

    if (musicSeek) {
        musicSeek.addEventListener('input', (e) => {
            const time = (e.target.value / 100) * musicPlayer.duration;
            musicPlayer.currentTime = time;
        });
    }

    musicPlayer.addEventListener('timeupdate', () => {
        if (musicSeek) {
            const percent = (musicPlayer.currentTime / musicPlayer.duration) * 100;
            musicSeek.value = percent;
        }
        if (musicTime) {
            musicTime.textContent = formatTime(musicPlayer.currentTime);
        }
    });

    musicPlayer.addEventListener('loadedmetadata', () => {
        if (musicDuration) {
            musicDuration.textContent = formatTime(musicPlayer.duration);
        }
        if (musicSeek) {
            musicSeek.max = 100;
        }
    });

    musicPlayer.addEventListener('play', updatePlayButton);
    musicPlayer.addEventListener('pause', updatePlayButton);

    musicPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        selectTrack(playlist[currentTrackIndex], currentTrackIndex);
    });

    ['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
        document.addEventListener(eventName, retryAutoplay, { once: true, passive: true });
    });

    renderPlaylist();
    selectTrack(playlist[0], 0, true);
    updatePlayButton();

    // Hàm render lịch cho 1 tháng
    function renderMonth(container, year, month) {
        // month: 0-based (0 = Jan)
        const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        const title = document.createElement('h3');
        title.className = 'month-title';
        title.textContent = `${monthNames[month]} ${year}`;
        container.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        // first day weekday (0=Sun..6=Sat)
        const first = new Date(year, month, 1);
        const startWeekday = first.getDay();

        // number of days
        const days = new Date(year, month + 1, 0).getDate();

        // add empty cells for alignment
        for (let i = 0; i < startWeekday; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-item empty';
            empty.textContent = '·';
            grid.appendChild(empty);
        }

        const today = new Date();

        for (let d = 1; d <= days; d++) {
            const cell = document.createElement('div');
            cell.className = 'cal-item';
            cell.textContent = d;

            // highlight today if matches
            if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d) {
                cell.classList.add('today');
            }

            // click shows the day in modal posting-date if present
            cell.addEventListener('click', () => {
                const overlay = document.getElementById('open-calendar-overlay') || document.getElementById('memory-modal');
                const pd = overlay ? overlay.querySelector('.posting-date') : null;
                const fmt = new Date(year, month, d).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
                if (pd) pd.textContent = `Ngày đăng: ${fmt}`;
            });

            grid.appendChild(cell);
        }

        container.appendChild(grid);
    }

    // Render May/June/July 2026 into calendars-container
    const calContainer = document.getElementById('calendars-container');
    if (calContainer) {
        renderMonth(calContainer, 2026, 4); // May (4)
        renderMonth(calContainer, 2026, 5); // June (5)
        renderMonth(calContainer, 2026, 6); // July (6)
    }
});
const posts = document.querySelectorAll('.post-item');

const observer = new IntersectionObserver(
(entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle(
            'active-post',
            entry.intersectionRatio > 0.65
        );
    });
},
{
    threshold: [0.65]
});

posts.forEach(post => observer.observe(post));
const feed = document.querySelector('.post-list');

let snapTimer;

feed.addEventListener('scroll', () => {
    clearTimeout(snapTimer);

    snapTimer = setTimeout(() => {
        const posts = [...document.querySelectorAll('.post-item')];

        let nearest = posts[0];
        let minDistance = Infinity;

        posts.forEach(post => {
            const rect = post.getBoundingClientRect();

            const centerDistance = Math.abs(
                rect.top + rect.height / 2 - window.innerHeight / 2
            );

            if (centerDistance < minDistance) {
                minDistance = centerDistance;
                nearest = post;
            }
        });

        nearest.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 60);
});launchOverlay.addEventListener('click', () => {
    launchOverlay.classList.add('hide');
    document.querySelector('.app-container')
        ?.classList.add('ready');
});
