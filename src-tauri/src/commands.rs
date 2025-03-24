#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, Name: {}", name,)
}
