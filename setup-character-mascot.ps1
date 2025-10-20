# Character Mascot Setup Script

Write-Host "Character Mascot Setup" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

$zipPath = "C:\Users\DANU PETER\Downloads\CharacterAnimations.zip"
$extractPath = "C:\Users\DANU PETER\Downloads\CharacterAnimations"
$modelsPath = "C:\danu's portfolio\public\models"
$characterPath = Join-Path $modelsPath "character"

# Create character directory
if (-not (Test-Path $characterPath)) {
    New-Item -ItemType Directory -Force -Path $characterPath | Out-Null
    Write-Host "Created character folder" -ForegroundColor Green
}

# Check if zip exists
if (Test-Path $zipPath) {
    Write-Host "Found CharacterAnimations.zip" -ForegroundColor Green
    
    # Extract if not already extracted
    if (-not (Test-Path $extractPath)) {
        Write-Host "Extracting archive..." -ForegroundColor Yellow
        Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
        Write-Host "Extraction complete!" -ForegroundColor Green
    } else {
        Write-Host "Archive already extracted" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Looking for character models..." -ForegroundColor Yellow
    
    # Find all model files
    $modelFiles = Get-ChildItem -Path $extractPath -Recurse -Include *.glb,*.gltf,*.fbx -ErrorAction SilentlyContinue
    
    if ($modelFiles.Count -gt 0) {
        Write-Host "Found $($modelFiles.Count) model file(s):" -ForegroundColor Green
        Write-Host ""
        
        for ($i = 0; $i -lt $modelFiles.Count; $i++) {
            $size = [math]::Round($modelFiles[$i].Length / 1KB, 2)
            Write-Host "[$($i + 1)] $($modelFiles[$i].Name) ($size KB)" -ForegroundColor White
            Write-Host "    Path: $($modelFiles[$i].DirectoryName)" -ForegroundColor Gray
        }
        
        Write-Host ""
        Write-Host "Which character would you like as your mascot? (Enter number)" -ForegroundColor Yellow
        $selection = Read-Host "Selection"
        
        if ($selection -match '^\d+$' -and [int]$selection -le $modelFiles.Count -and [int]$selection -gt 0) {
            $selectedFile = $modelFiles[[int]$selection - 1]
            
            if ($selectedFile.Extension -in @('.glb', '.gltf')) {
                Write-Host ""
                Write-Host "Perfect! This is a compatible format." -ForegroundColor Green
                Write-Host "Copying character to project..." -ForegroundColor Yellow
                
                $destPath = Join-Path $characterPath "mascot$($selectedFile.Extension)"
                Copy-Item -Path $selectedFile.FullName -Destination $destPath -Force
                
                Write-Host "Character copied successfully!" -ForegroundColor Green
                Write-Host "Location: $destPath" -ForegroundColor White
                Write-Host ""
                Write-Host "Now refresh your browser to see your interactive mascot!" -ForegroundColor Cyan
            } else {
                Write-Host ""
                Write-Host "This is a $($selectedFile.Extension) file - needs conversion to .glb" -ForegroundColor Yellow
                Write-Host "Use Blender or online converter, then save as:" -ForegroundColor Yellow
                Write-Host "  $characterPath\mascot.glb" -ForegroundColor White
            }
        }
    } else {
        Write-Host "No model files found in the archive." -ForegroundColor Red
    }
} else {
    Write-Host "CharacterAnimations.zip not found at:" -ForegroundColor Red
    Write-Host "  $zipPath" -ForegroundColor White
}

Write-Host ""
Write-Host "Current character folder contents:" -ForegroundColor Cyan
$currentFiles = Get-ChildItem -Path $characterPath -ErrorAction SilentlyContinue
if ($currentFiles) {
    $currentFiles | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  (empty)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
