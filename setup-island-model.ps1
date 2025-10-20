# Floating Island Model Setup Script
# Run this in PowerShell after extracting your float forest.7z file

Write-Host "Floating Island Model Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$downloadsPath = "$env:USERPROFILE\Downloads"
$modelsPath = "C:\danu's portfolio\public\models"

Write-Host "Step 1: Looking for extracted files..." -ForegroundColor Yellow

# Look for common model file extensions in Downloads
$modelFiles = Get-ChildItem -Path $downloadsPath -Recurse -Include *.glb,*.gltf,*.fbx,*.obj -ErrorAction SilentlyContinue | 
              Where-Object { $_.FullName -like "*float*" -or $_.FullName -like "*forest*" -or $_.FullName -like "*island*" }

if ($modelFiles.Count -gt 0) {
    Write-Host "Found model files:" -ForegroundColor Green
    $modelFiles | ForEach-Object { 
        Write-Host "  - $($_.FullName)" -ForegroundColor White
    }
    Write-Host ""
    
    # Ask user to select a file
    Write-Host "Which file would you like to use? (Enter number)" -ForegroundColor Yellow
    for ($i = 0; $i -lt $modelFiles.Count; $i++) {
        Write-Host "[$($i + 1)] $($modelFiles[$i].Name) ($([math]::Round($modelFiles[$i].Length / 1MB, 2)) MB)"
    }
    
    $selection = Read-Host "Selection"
    
    if ($selection -match '^\d+$' -and [int]$selection -le $modelFiles.Count -and [int]$selection -gt 0) {
        $selectedFile = $modelFiles[[int]$selection - 1]
        
        # Check if it is a GLB or GLTF file
        if ($selectedFile.Extension -in @('.glb', '.gltf')) {
            Write-Host ""
            Write-Host "Great! This is a compatible format." -ForegroundColor Green
            Write-Host "Copying to project..." -ForegroundColor Yellow
            
            $destPath = Join-Path $modelsPath "floating-island$($selectedFile.Extension)"
            Copy-Item -Path $selectedFile.FullName -Destination $destPath -Force
            
            Write-Host "Model copied successfully!" -ForegroundColor Green
            Write-Host "Location: $destPath" -ForegroundColor White
            Write-Host ""
            Write-Host "Now refresh your browser to see the floating island!" -ForegroundColor Cyan
        }
        else {
            Write-Host ""
            Write-Host "This is a $($selectedFile.Extension) file." -ForegroundColor Yellow
            Write-Host "You need to convert it to .glb format first." -ForegroundColor Yellow
            Write-Host ""
            Write-Host "Options:" -ForegroundColor Cyan
            Write-Host "1. Use online converter: https://products.aspose.app/3d/conversion/fbx-to-glb"
            Write-Host "2. Use Blender (free): Import then Export as glTF 2.0 (.glb)"
            Write-Host ""
            Write-Host "After conversion, copy the .glb file to:" -ForegroundColor Yellow
            Write-Host "  $modelsPath\floating-island.glb" -ForegroundColor White
        }
    }
}
else {
    Write-Host "No model files found in Downloads." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Extract the float forest.7z file"
    Write-Host "2. Find the model file (.glb, .gltf, .fbx, or .obj)"
    Write-Host "3. Copy it to: $modelsPath\floating-island.glb"
    Write-Host ""
    Write-Host "Or tell me where you extracted the files!" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Current models folder contents:" -ForegroundColor Cyan
$currentModels = Get-ChildItem -Path $modelsPath -ErrorAction SilentlyContinue
if ($currentModels) {
    $currentModels | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  (empty)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
