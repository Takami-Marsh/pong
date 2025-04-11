# Pong Game

A modern implementation of the classic Pong game using HTML, CSS, and JavaScript with jQuery.

![Pong Game Logo](pong_logo.png)

## Features

- **Multiple Game Modes:**
  - Pro - Challenge yourself against a highly skilled AI opponent
  - Legend - Face an extremely difficult AI opponent
  - Easy - Practice with a more forgiving AI opponent
  - Two Players - Play against a friend locally

- **Gravity Mode:** Enable gravity physics for an extra challenge
- **Dynamic Ball Physics:** Ball speed increases during gameplay
- **Responsive Design:** Adapts to different screen sizes
- **Real-time Score Tracking:** Keep track of points for both players

## How to Play

1. Open `index.html` in a modern web browser
2. Select your game mode (1-4):
   - 1: Pro Mode
   - 2: Legend Mode
   - 3: Easy Mode
   - 4: Two Players
3. Optionally enable gravity mode for an additional challenge
4. Click "START!!" to begin the game

### Controls

#### Player 1 (Right Paddle):
- Up Arrow: Move paddle up
- Down Arrow: Move paddle down

#### Player 2 (Left Paddle):
- W: Move paddle up
- S: Move paddle down
(Only active in Two Players mode)

## Game Rules

- The ball bounces off paddles and walls
- Miss the ball with your paddle and your opponent scores a point
- Ball speed increases with each paddle hit
- In gravity mode, the ball is affected by simulated gravity

## Technical Details

- Built with HTML5, CSS3, and JavaScript
- Uses jQuery for DOM manipulation and event handling
- Implements requestAnimationFrame for smooth animations
- Responsive design adapts to window size

## Installation

No installation required! Simply clone the repository and open `index.html` in a web browser:

```bash
git clone [repository-url]
cd pong
open index.html
```

## License

See the [LICENSE](LICENSE) file for license rights and limitations.
