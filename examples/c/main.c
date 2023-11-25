#include <emscripten.h>

#define WIDTH 1080
#define HEIGHT 1920

#define SIZE WIDTH * HEIGHT

int frame = 0;
int BUFFER[SIZE];

EMSCRIPTEN_KEEPALIVE
int* get_buffer() {
  return BUFFER;
}

EMSCRIPTEN_KEEPALIVE
void draw() {
  frame += 1;

  for (int y = 0; y < HEIGHT; y++) {
    for(int x = 0; x < WIDTH; x++) {
      BUFFER[y * WIDTH + x] = 0xFFFF0000;
    }
  }
}