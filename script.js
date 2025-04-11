$(document).ready(function () {
  // 変数定義
  let start_g = false, p_speed = [], p_position = [], b_position = [], b_speed = [], mode = [];
  // 一時的
  let total_bot = 0, area2, area1, total_bot2 = 0;
  // オプション確認・開始処理
  function eval() {
    if ($('input[type="number"]').val() >= 1 && $('input[type="number"]').val() <= 4) {
      mode[0] = Number($('input[type="number"]').val());
    } else {
      alert('Please enter a correct number');
      return false;
    }
    if ($('input:checked').val() == 'gravity') {
      mode[1] = 1;
    } else {
      mode[1] = 0;
    }
    start();
  }
  // ランダム開始処理
  function rand_ball() {
    if (Math.floor(Math.random() * 2) == 1) {
      b_speed[0] = 5;
    } else {
      b_speed[0] = -5;
    }
    b_speed[1] = Math.floor(Math.random() * 11 - 5);
    if (b_speed[1] == 0) {
      b_speed[1] = 5;
    }
    b_speed[2] = 0.1;
  }
  // 開始処理
  function start() {
    $('.pong_area').css('height', $(window).height() - 100 + 'px');
    $('.start, .bot, .gravity').slideUp(500);
    setTimeout(() => {
      $('.game_area').fadeIn(1000);
      rand_ball();
      keys();
      start_g = true;
      b_speed[2] = 0.1;
    }, 500);
  }
  // キー入力処理
  function keys() {
    $(document).keydown(function (e) {
      if (e.keyCode == 38 || e.which == 38) {
        p_speed[0] = -10;
      }
      if (e.keyCode == 40 || e.which == 40) {
        p_speed[0] = 10;
      }
      if (mode[0] == 4) {
        if (e.keyCode == 87 || e.which == 87) {
          p_speed[1] = -10;
        }
        if (e.keyCode == 83 || e.which == 83) {
          p_speed[1] = 10;
        }
      }
    });
    $(document).keyup(function (e) {
      if (e.keyCode == 38 || e.which == 38) {
        p_speed[0] = 0;
      }
      if (e.keyCode == 40 || e.which == 40) {
        p_speed[0] = 0;
      }
      if (mode[0] == 4) {
        if (e.keyCode == 87 || e.which == 87) {
          p_speed[1] = 0;
        }
        if (e.keyCode == 83 || e.which == 83) {
          p_speed[1] = 0;
        }
      }
    });
  }
  // paddle処理
  function paddle() {
    p_position[0] = Number($('.paddle1').css('top').replace('px', '')) + p_speed[0];
    p_position[1] = Number($('.paddle2').css('top').replace('px', '')) + p_speed[1];
    if (p_position[0] < 100) {
      p_position[0] = 100;
    } else if (p_position[0] > $(window).height() - 100) {
      p_position[0] = $(window).height() - 100;
    }
    if (p_position[1] < 100) {
      p_position[1] = 100;
    } else if (p_position[1] > $(window).height() - 100) {
      p_position[1] = $(window).height() - 100;
    }
    $('.paddle1').css('top', p_position[0] + 'px');
    $('.paddle2').css('top', p_position[1] + 'px');
  }
  // ボール処理
  function ball() {
    // 変数更新
    p_position[0] = Number($('.paddle1').css('top').replace('px', ''));
    p_position[1] = Number($('.paddle2').css('top').replace('px', ''));
    // x軸処理
    b_position[0] = Number($('.ball').css('left').replace('px', '')) + b_speed[0];
    if (b_position[0] >= $(window).width() - 10) {
      if (b_position[1] + 10 >= p_position[0] && b_position[1] <= p_position[0] + 100) {
        b_speed[0] *= -1.1;
        b_speed[2] = 0.1;
        if (p_speed[0] > 0) {
          b_speed[1] += 3
        } else if (p_speed[0] < 0) {
          b_speed[1] -= 3
        }
      } else {
        $('.p2').html(Number($('.p2').html()) + 1);
        restart();
        return false;
      }
    } else if (b_position[0] <= 0) {
      if (b_position[1] + 10 >= p_position[1] && b_position[1] <= p_position[1] + 100) {
        b_speed[0] *= -1.1;
        b_speed[2] = 0.1;
        if (p_speed[1] > 0) {
          b_speed[1] += 3
        } else if (p_speed[1] < 0) {
          b_speed[1] -= 3
        }
      } else {
        $('.p1').html(Number($('.p1').html()) + 1);
        restart();
        return false;
      }
    }
    // y軸処理
    if (b_position[1] <= 100) {
      b_speed[1] *= -1;
      b_speed[2] += 0.02;
    } else if (b_position[1] >= $(window).height() - 10) {
      b_speed[1] *= -1;
      b_speed[2] += 0.02;
    }
    if (mode[1] == 1) {
      b_speed[1] += b_speed[2];
    }
    b_position[1] = Number($('.ball').css('top').replace('px', '')) + b_speed[1];
    if (b_position[1] <= 100) {
      b_position[1] = 100;
    } else if (b_position[1] >= $(window).height() - 10) {
      b_position[1] = $(window).height() - 10;
    }
    $('.ball').css('left', b_position[0] + 'px');
    $('.ball').css('top', b_position[1] + 'px');
  }
  // 再開処理
  function restart() {
    $('.ball').css('left', '50%');
    $('.ball').css('top', '50%');
    rand_ball();
  }
  // 一時的
  // ボット処理
  function bot() {
    if (mode[0] != 4) {
      if (b_speed[0] < 0) {
        total_bot++;
        if (mode[0] == 1 && total_bot % 20 == 0) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (b_position[1] > area2 && b_position[1] - area2 + 50 > 80) {
            p_speed[1] = Math.floor(Math.random() * 2 + 6);
          } else if (b_position[1] < area2 + 50 && area2 - b_position[1] > 30) {
            p_speed[1] = Math.floor(Math.random() * 2 + 6) * -1;
          } else {
            p_speed[1] = Math.floor(Math.random() * 2);
          }
        } else if (mode[0] == 2) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (b_position[1] > area2 && b_position[1] - area2 + 50 > 80) {
            p_speed[1] = Math.floor(Math.random() * 2 + 50);
          } else if (b_position[1] < area2 + 50 && area2 - b_position[1] > 30) {
            p_speed[1] = Math.floor(Math.random() * 2 + 50) * -1;
          } else {
            p_speed[1] = Math.floor(Math.random() * 3 - 1);
          }
        }
        else if (mode[0] == 3 && total_bot % 20 == 0) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area2 = Number($('.paddle2').css('top').replace('px', '')) + 50;
          if (b_position[1] > area2 && b_position[1] - area2 + 50 > 80) {
            p_speed[1] = Math.floor(Math.random() * 2 + 4);
          } else if (b_position[1] < area2 + 50 && area2 - b_position[1] > 30) {
            p_speed[1] = Math.floor(Math.random() * 2 + 4) * -1;
          } else {
            p_speed[1] = Math.floor(Math.random() * 4);
          }
        }
      } else {
        p_speed[1] = 0;
      }
    }
  }
  // 一時的
  // ボット処理2
  function bot2() {
    if (mode[0] != 4) {
      total_bot2++;
      if (b_speed[0] > 0) {
        if (mode[0] == 1 && total_bot2 % 20 == 0) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area1 = Number($('.paddle1').css('top').replace('px', '')) + 50;
          if (b_position[1] > area1 && b_position[1] - area1 + 50 > 80) {
            p_speed[0] = Math.floor(Math.random() * 2 + 6);
          } else if (b_position[1] < area1 + 50 && area1 - b_position[1] > 30) {
            p_speed[0] = Math.floor(Math.random() * 2 + 6) * -1;
          } else {
            p_speed[0] = Math.floor(Math.random() * 2);
          }
        } else if (mode[0] == 2) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area1 = Number($('.paddle1').css('top').replace('px', '')) + 50;
          if (b_position[1] > area1 && b_position[1] - area1 + 50 > 80) {
            p_speed[0] = Math.floor(Math.random() * 2 + 50);
          } else if (b_position[1] < area1 + 50 && area1 - b_position[1] > 30) {
            p_speed[0] = Math.floor(Math.random() * 2 + 50) * -1;
          } else {
            p_speed[0] = Math.floor(Math.random() * 3 - 1);
          }
        }
        else if (mode[0] == 3 && total_bot % 20 == 0) {
          b_position[1] = Number($('.ball').css('top').replace('px', ''));
          area1 = Number($('.paddle1').css('top').replace('px', '')) + 50;
          if (b_position[1] > area1 && b_position[1] - area1 + 50 > 80) {
            p_speed[0] = Math.floor(Math.random() * 2 + 4);
          } else if (b_position[1] < area1 + 50 && area1 - b_position[1] > 30) {
            p_speed[0] = Math.floor(Math.random() * 2 + 4) * -1;
          } else {
            p_speed[0] = Math.floor(Math.random() * 4);
          }
        }
      } else {
        p_speed[0] = 0;
      }
    }
  }
  // 基本処理
  function general() {
    if (start_g) {
      $('.pong_area').css('height', $(window).height() - 100 + 'px');
      paddle();
      ball();
      // 一時的
      bot();
      // bot2();
    }
  }
  // 「開始」クリック時処理
  $('.start').click(function () {
    eval();
  });
  // インターバル処理
  setInterval(() => {
    general();
  }, 1000 / 60);
});