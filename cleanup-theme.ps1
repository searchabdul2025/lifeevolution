# PowerShell script to clean up dark mode and gradient classes from all portal files

$files = @(
    "src\app\admin\page.tsx",
    "src\app\member\page.tsx",
    "src\app\agent\page.tsx",
    "src\app\affiliate\page.tsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    
    # Remove dark mode classes
    $content = $content -replace ' dark:bg-\[#[0-9a-fA-F]+\]', ''
    $content = $content -replace ' dark:bg-\[[^\]]+\]', ''
    $content = $content -replace ' dark:hover:bg-\[[^\]]+\]', ''
    $content = $content -replace ' dark:text-\[[^\]]+\]', ''
    
    # Remove gradient classes
    $content = $content -replace 'bg-gradient-to-[a-z]+ from-\[color:var\(--[^\)]+\)\] to-\[color:var\(--[^\)]+\)\]', 'bg-blue-600'
    $content = $content -replace 'bg-gradient-to-[a-z]+ from-\[[^\]]+\] to-\[[^\]]+\]', 'bg-blue-600'
    
    # Replace CSS variables with concrete values
    $content = $content -replace 'text-\[color:var\(--text-primary\)\]', 'text-gray-900'
    $content = $content -replace 'text-\[color:var\(--text-secondary\)\]', 'text-gray-700'
    $content = $content -replace 'text-\[color:var\(--text-tertiary\)\]', 'text-gray-500'
    $content = $content -replace 'border-\[color:var\(--border\)\]', 'border-gray-200'
    $content = $content -replace 'text-\[color:var\(--gold\)\]', 'text-blue-600'
    $content = $content -replace 'bg-\[color:var\(--gold\)\]', 'bg-blue-600'
    $content = $content -replace 'border-\[color:var\(--gold\)\]', 'border-blue-600'
    $content = $content -replace 'hover:border-\[color:var\(--gold\)\]', 'hover:border-blue-600'
    
    Set-Content $file $content
    Write-Host "Cleaned up $file"
}

Write-Host "Theme cleanup complete!"
