#[tauri::command]
#[specta::specta]
pub fn greet(name: &str) -> String {
    format!("Hello, Name: {}", name,)
}
