#![no_std]

#[panic_handler]
fn handle_panic(_: &core::panic::PanicInfo) -> ! {
    loop {}
}

use core::sync::atomic::{AtomicU32, Ordering};

static FRAME: AtomicU32 = AtomicU32::new(0);

const WIDTH: usize = 600;
const HEIGHT: usize = 600;

#[no_mangle]
static mut BUFFER: [u32; WIDTH * HEIGHT] = [0; WIDTH * HEIGHT];

#[no_mangle]
pub unsafe extern fn draw() {
    render_frame_safe(&mut BUFFER)
}

unsafe fn render_frame_safe(buffer: &mut [u32; WIDTH * HEIGHT]) {
    let f = FRAME.fetch_add(1, Ordering::Relaxed);

    for y in 0..HEIGHT {
        for x in 0..WIDTH {
            *buffer.get_unchecked_mut(y * WIDTH + x) = f.wrapping_add((x ^ y) as u32) | 0xFF_00_00_00;
            // TODO: Using this significantly increases wasm size
            // buffer[y * WIDTH + x] = f.wrapping_add((x ^ y) as u32) | 0xFF_00_00_00;
        }
    }
}