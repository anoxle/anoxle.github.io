local player = game.Players.LocalPlayer
local mouse = player:GetMouse()
local gui = Instance.new("ScreenGui")
gui.Name = "RubbyHubGUI"
gui.ResetOnSpawn = false

-- Parent the ScreenGui to a persistent location
pcall(function()
    if syn then
        syn.protect_gui(gui)
        gui.Parent = game:GetService("CoreGui")
    else
        gui.Parent = player:WaitForChild("PlayerGui")
    end
end)

local hub = Instance.new("Frame")
local title = Instance.new("TextLabel")
local divider = Instance.new("Frame")
local scrollFrame = Instance.new("ScrollingFrame")
local isEspActive = false
local isBigHeadsActive = false
local isDayActive = false
local espLabels = {}

-- Hub Properties
hub.Size = UDim2.new(0, 500, 0, 300)
hub.Position = UDim2.new(0.5, -250, 0.5, -150)
hub.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
hub.BackgroundTransparency = 0.1
hub.Active = true
hub.Draggable = true
hub.Parent = gui

-- Rounded corners
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 15)
corner.Parent = hub

-- Title Properties
title.Size = UDim2.new(1, 0, 0, 50)
title.Position = UDim2.new(0, 0, 0, 0)
title.Text = "Rubby Hub"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.BackgroundTransparency = 1
title.Font = Enum.Font.GothamBold
title.TextSize = 26
title.TextStrokeTransparency = 0.5
title.Parent = hub

-- Divider Properties
divider.Size = UDim2.new(0.9, 0, 0, 2)
divider.Position = UDim2.new(0.05, 0, 0, 55)
divider.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
divider.BorderSizePixel = 0
divider.Parent = hub

-- Scrolling Frame Properties
scrollFrame.Size = UDim2.new(0.9, 0, 0.75, 0)
scrollFrame.Position = UDim2.new(0.05, 0, 0.2, 0)
scrollFrame.BackgroundTransparency = 1
scrollFrame.ScrollBarThickness = 8
scrollFrame.ScrollingDirection = Enum.ScrollingDirection.Y
scrollFrame.AutomaticCanvasSize = Enum.AutomaticSize.Y
scrollFrame.Parent = hub

-- Function to create a button
local function createButton(text, positionY)
    local button = Instance.new("TextButton")
    button.Size = UDim2.new(1, -16, 0, 50)  -- Adjusted width to account for scrollbar
    button.Position = UDim2.new(0, 0, 0, positionY)
    button.Text = text
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.BackgroundColor3 = Color3.fromRGB(70, 70, 70)
    button.BackgroundTransparency = 0.5
    button.Font = Enum.Font.Gotham
    button.TextSize = 22
    button.Parent = scrollFrame

    local buttonCorner = Instance.new("UICorner")
    buttonCorner.CornerRadius = UDim.new(0, 10)
    buttonCorner.Parent = button

    return button
end

-- Create buttons
local espLabel = createButton("ESP", 0)
local bigHeadsLabel = createButton("Big Heads", 60)
local dayLabel = createButton("Day", 120)
local rejoinLabel = createButton("Rejoin", 180)

-- ESP Creation Function
local function createESP(player)
    if player.Character and player.Character:FindFirstChild("Humanoid") then
        local humanoidRootPart = player.Character:FindFirstChild("HumanoidRootPart")

        if humanoidRootPart then
            -- Create Highlight for ESP
            local highlight = Instance.new("Highlight")
            highlight.Adornee = player.Character
            highlight.FillColor = Color3.fromRGB(255, 0, 0)
            highlight.FillTransparency = 0.5
            highlight.OutlineColor = Color3.fromRGB(255, 255, 255)
            highlight.OutlineTransparency = 0.5
            highlight.Parent = player.Character

            -- Create BillboardGui for ESP label
            local billboardGui = Instance.new("BillboardGui")
            billboardGui.Adornee = humanoidRootPart
            billboardGui.Size = UDim2.new(0, 200, 0, 50)
            billboardGui.StudsOffset = Vector3.new(0, 3, 0)
            billboardGui.AlwaysOnTop = true
            billboardGui.Parent = player.Character

            -- ESP label inside the BillboardGui
            local espLabel = Instance.new("TextLabel")
            espLabel.Size = UDim2.new(1, 0, 1, 0)
            espLabel.BackgroundTransparency = 1
            espLabel.TextColor3 = Color3.fromRGB(255,255,255)
            espLabel.Font = Enum.Font.Gotham
            espLabel.TextSize = 14
            espLabel.TextStrokeColor3 = Color3.fromRGB(255, 255, 255)
            espLabel.TextStrokeTransparency = 1
            espLabel.TextWrapped = true
            espLabel.Text = "Health: " .. math.floor(player.Character.Humanoid.Health) .. " | Name: " .. player.Name
            espLabel.Parent = billboardGui

            espLabels[player.UserId] = billboardGui

            -- Update the label with health and name
            local function updateLabel()
                if player.Character and player.Character:FindFirstChild("Humanoid") then
                    local humanoid = player.Character:FindFirstChildOfClass("Humanoid")
                    if humanoid then
                        espLabel.Text = "Health: " .. math.floor(humanoid.Health) .. " | Name: " .. player.Name
                    end
                end
            end

            -- Update label continuously
            game:GetService('RunService').RenderStepped:Connect(updateLabel)
        end
    end
end

-- Update ESP for all players
local function updateESP()
    for _, p in pairs(game.Players:GetPlayers()) do
        if p ~= player and p.Character then
            if not p.Character:FindFirstChild("BillboardGui") then
                createESP(p)
            end
        end
    end
end

-- Toggle ESP functionality
local function toggleESP()
    isEspActive = not isEspActive
    espLabel.TextColor3 = isEspActive and Color3.fromRGB(0, 255, 0) or Color3.fromRGB(255, 255, 255)

    if isEspActive then
        updateESP()
    else
        for _, p in pairs(game.Players:GetPlayers()) do
            local billboardGui = p.Character:FindFirstChildOfClass("BillboardGui")
            if billboardGui then
                billboardGui:Destroy()
            end
            local highlight = p.Character:FindFirstChildOfClass("Highlight")
            if highlight then
                highlight:Destroy()
            end
        end
    end
end

espLabel.MouseButton1Click:Connect(toggleESP)

-- Run a loop to constantly update ESP if active
spawn(function()
    while true do
        wait(1)
        if isEspActive then
            updateESP()
        end
    end
end)

-- Big Heads functionality
local function toggleBigHeads()
    isBigHeadsActive = not isBigHeadsActive
    bigHeadsLabel.TextColor3 = isBigHeadsActive and Color3.fromRGB(0, 255, 0) or Color3.fromRGB(255, 255, 255)

    -- Rescale character parts for Big Heads
    local function scaleParts(character)
        local head = character:FindFirstChild("Head")
        local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
        if head then
            head.Size = isBigHeadsActive and Vector3.new(12, 12, 12) or Vector3.new(2, 1, 1)
            head.CanCollide = false
        end
        if humanoidRootPart then
            humanoidRootPart.Size = isBigHeadsActive and Vector3.new(5, 5, 5) or Vector3.new(2, 2, 1)
        end
    end

    -- Apply scaling to all players
    for _, p in pairs(game.Players:GetPlayers()) do
        if p ~= player and p.Character then
            scaleParts(p.Character)
        end
    end

    -- Refresh head size every second
    spawn(function()
        while true do
            wait(1)
            for _, p in pairs(game.Players:GetPlayers()) do
                if p ~= player and p.Character then
                    if isBigHeadsActive then
                        scaleParts(p.Character)
                    end
                end
            end
        end
    end)

    -- Refresh head size when a player dies
    game.Players.PlayerAdded:Connect(function(p)
        p.CharacterAdded:Connect(function(character)
            character:WaitForChild("Humanoid").Died:Connect(function()
                if isBigHeadsActive then
                    wait(1) -- wait for 1 second to ensure the character is fully dead
                    scaleParts(character)
                end
            end)
        end)
    end)
end

bigHeadsLabel.MouseButton1Click:Connect(toggleBigHeads)

-- Day functionality
local function toggleDay()
    isDayActive = not isDayActive
    dayLabel.TextColor3 = isDayActive and Color3.fromRGB(0, 255, 0) or Color3.fromRGB(255, 255, 255)

    if isDayActive then
        game.Lighting.TimeOfDay = "14:00:00"
        game:GetService("RunService").RenderStepped:Connect(function()
            if isDayActive then
                game.Lighting.TimeOfDay = "14:00:00"
            end
        end)
    else
        game.Lighting.TimeOfDay = "12:00:00" -- Reset to default or desired time
    end
end

dayLabel.MouseButton1Click:Connect(toggleDay)

-- Rejoin functionality
local function rejoin()
    game:GetService("TeleportService"):Teleport(game.PlaceId, player)
end

rejoinLabel.MouseButton1Click:Connect(rejoin)

-- Animation on Load
hub.Position = UDim2.new(0.5, -250, 1, -310)
hub:TweenPosition(UDim2.new(0.5, -250, 0.5, -150), Enum.EasingDirection.Out, Enum.EasingStyle.Quart, 1, true)
