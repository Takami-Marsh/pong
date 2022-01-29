$(document).ready(function () {
  // 変数定義
  let start_g = false;
  let speed_1;
  let speed_2;
  let write;
  let position;
  let position2;
  let bx_position;
  let by_position;
  let x_speed;
  let y_speed;
  let points1 = 0;
  let points2 = 0;
  let area;
  let area2;
  let end = 0;
  let p_end = 1;
  let time = 0;
  let bot_c = 0;
  let total_bot = 0;
  let gravity = 0;
  $('.pong_area').css('height', $(window).height() - 100 + 'px');
  // 開始処理
  function start() {
    if (points1 == 1) {
      write = Number($('.p1').html()) + 1;
      $('.p1').html(write);
      points1 = 0;
      if (write == 7) {
        if (bot_c != 0) {
          alert('p1の勝利');
        } else {
          alert('botの勝利');
        }
        location.href = './pong.html';
      }
    }
    if (points2 == 1) {
      write = Number($('.p2').html()) + 1;
      $('.p2').html(write);
      points2 = 0;
      if (write == 7) {
        if (bot_c != 0) {
          alert('p2の勝利');
        } else {
          alert('p1の勝利');
          location.href = './pong.html';
        }
      }
    }
    $('.ball').css('left', '50%');
    $('.ball').css('top', '50%');
    time = 0;
    start_g = true;
    $('.start').slideUp(500);
    $('.bot').slideUp(500);
    $('.gravity').slideUp(500);
    setTimeout(() => {
      $('.game_area').fadeIn(1000);
    }, 500);
    if (Math.floor(Math.random() * 2) == 1) {
      x_speed = 3;
      y_speed = Math.floor(Math.random() * 5 + 1);
    } else {
      x_speed = -3;
      y_speed = Math.floor(Math.random() * 5 + 1);
    }
  }
  // paddle 基本処理
  function paddle_general() {
    $('.pong_area').css('height', $(window).height() - 100 + 'px');
    if (speed_1 > 0 || speed_1 < 0) {
      position = Number($('.paddle1').css('top').replace('px', '')) + speed_1;
      if (position < 100) {
        position = 100;
      } else if (position > $(window).height() - 100) {
        position = $(window).height() - 100;
      }
      $('.paddle1').css('top', position + 'px');
    }
    if (speed_2 > 0 || speed_2 < 0) {
      position2 = Number($('.paddle2').css('top').replace('px', '')) + speed_2;
      if (position2 < 100) {
        position2 = 100;
      } else if (position2 > $(window).height() - 100) {
        position2 = $(window).height() - 100;
      }
      $('.paddle2').css('top', position2 + 'px');
    }
  }
  // ball 基本処理
  function ball_general() {
    if (end == 0) {
      // 変数更新
      bx_position = Number($('.ball').css('left').replace('px', ''));
      by_position = Number($('.ball').css('top').replace('px', ''));
      // paddle当たり判定
      if (bx_position >= $(window).width() - 20) {
        area = Number($('.paddle1').css('top').replace('px', ''));
        if (by_position >= area && by_position <= area + 100) {
          x_speed *= -1;
          time++;
          p_end = 0;
        }
      }
      if (bx_position <= 10) {
        area2 = Number($('.paddle2').css('top').replace('px', ''));
        if (by_position >= area2 && by_position <= area2 + 100) {
          x_speed *= -1;
          time++;
          p_end = 0;
        }
      }
      // x軸処理
      if (x_speed > 0 || x_speed < 0) {
        bx_position = Number($('.ball').css('left').replace('px', '')) + x_speed;
        if (bx_position >= $(window).width()) {
          x_speed = 0;
          points1 = 1;
          end = 1;
        } else if (bx_position <= 5) {
          x_speed = 0;
          bx_position = 0;
          points2 = 1;
          end = 1;
        }
      }
      // y軸処理
      if (y_speed > 0 || y_speed < 0) {
        by_position = Number($('.ball').css('top').replace('px', '')) + y_speed;
        if (by_position <= 100) {
          y_speed *= -1;
        } else if (by_position >= $(window).height() - 10) {
          y_speed *= -1;
        }
      }
      if (y_speed > 0 || y_speed < 0) {
        if (x_speed < 1 && x_speed >= 0) {
          x_speed++;
        }
        if (gravity == 1) {
          y_speed += 0.05;
        }
      }
      if (p_end == 0 && end == 1) {
        end = 0;
        p_end = 1;
      }
      if (end == 0) {
        $('.ball').css('left', bx_position + 'px');
        $('.ball').css('top', by_position + 'px');
      }
    } else {
      start();
      end = 0;
      p_end = 1;
    }
  }
  // ボット処理
  function bot() {
    if (bot_c != 0) {
      if (x_speed < 0) {
        total_bot++;
        if (bot_c == 1 && total_bot % 20 == 0) {
          by_position = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (by_position > area2 && by_position - area2 + 50 > 80) {
            speed_2 = Math.floor(Math.random() * 2 + 5);
          } else if (by_position < area2 + 50 && area2 - by_position > 30) {
            speed_2 = Math.floor(Math.random() * 2 + 5) * -1;
          } else {
            speed_2 = Math.floor(Math.random() * 2);
          }
        } else if (bot_c == 2) {
          by_position = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (by_position > area2 && by_position - area2 + 50 > 80) {
            speed_2 = Math.floor(Math.random() * 2 + 5);
          } else if (by_position < area2 + 50 && area2 - by_position > 30) {
            speed_2 = Math.floor(Math.random() * 2 + 5) * -1;
          } else {
            speed_2 = Math.floor(Math.random() * 3 - 1);
          }
        }
        else if (bot_c == 3 && total_bot % 30 == 0) {
          by_position = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (by_position > area2 && by_position - area2 + 50 > 80) {
            speed_2 = Math.floor(Math.random() * 2 + 4);
          } else if (by_position < area2 + 50 && area2 - by_position > 30) {
            speed_2 = Math.floor(Math.random() * 2 + 4) * -1;
          } else {
            speed_2 = Math.floor(Math.random() * 4);
          }
        }
      } else {
        speed_2 = 0;
      }
    }
  }
  // 処理部
  $('.start').click(function () {
    start();
    if ($('input[type="number"]').val() == 1) {
      bot_c = 1;
    } else if ($('input[type="number"]').val() == 2) {
      bot_c = 2;
    } else if ($('input[type="number"]').val() == 3) {
      bot_c = 3;
    } else if ($('input[type="number"]').val() == 4) {
      bot_c = 0;
    } else {
      alert('Please enter a correct number');
      location.href = './pong.html';
    }
    if ($('input:checked').val() == 'gravity') {
      gravity = 1;
    }
  });
  document.addEventListener('keydown', function (e) {
    if (bot_c == 0) {
      // W
      if (e.keyCode == 87 || e.which == 87) {
        speed_2 = -5;
      }
      // S
      if (e.keyCode == 83 || e.which == 83) {
        speed_2 = 5;
      }
    }
    // ↑
    if (e.keyCode == 38 || e.which == 38) {
      speed_1 = -5;
    }
    // ↓
    if (e.keyCode == 40 || e.which == 40) {
      speed_1 = 5;
    }
  }, false);
  document.addEventListener('keyup', function (e) {
    if (bot_c == 0) {
      if (e.keyCode == 87 || e.which == 87) {
        speed_2 = 0;
      }
      if (e.keyCode == 83 || e.which == 83) {
        speed_2 = 0;
      }
    }
    if (e.keyCode == 38 || e.which == 38) {
      speed_1 = 0;
    }
    if (e.keyCode == 40 || e.which == 40) {
      speed_1 = 0;
    }
  }, false);
  setInterval(() => {
    if (start_g && time == 0) {
      paddle_general();
      ball_general();
      bot();
    }
  }, 1000 / 80);
  setInterval(() => {
    if (start_g && time == 1) {
      paddle_general();
      ball_general();
      bot();
    }
  }, 1000 / 100);
  setInterval(() => {
    if (start_g && time == 2) {
      paddle_general();
      ball_general();
      bot();
    }
  }, 1000 / 120);
  setInterval(() => {
    if (start_g && time == 3) {
      paddle_general();
      ball_general();
      bot();
    }
  }, 1000 / 140);
  setInterval(() => {
    if (start_g && time >= 4) {
      paddle_general();
      ball_general();
      bot();
    }
  }, 1000 / 160);
});
