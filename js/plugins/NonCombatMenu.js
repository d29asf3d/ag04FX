#-------------------------------------------------------------------------------
# Non-Combat Menu v1.04a
#-- Fully customizable menu geared toward less battle-oriented games.
#-- By mjshi
#-------------------------------------------------------------------------------
# Installation: Put above Main, preferably also above other custom scripts.
#-------------------------------------------------------------------------------
# Update notes:
#- Added support for most quest log scripts.
#- Added support for separators.
# Bugfixes:
#- Fixed the gold window bug
#- Forced the ingame menu command to call the Non-Combat Menu rather than the
#  regular one.
#-------------------------------------------------------------------------------

$imported = {} if $imported.nil?
$imported["NonCombatMenu"] = true

module NonCombatMenu
  MENU = [
  #-----------------------------------------------------------------------------
  # **CONFIGURATION**
  #-----------------------------------------------------------------------------
  # What should the actual menu show?
  # Put a # in front of the ones you don't want to show, and you can reorder
  # this list to change the order in the menu.
  # **Don't remove the comma after each []!**
  #
  ['Items',   :item],
  ['Status', :status],
  ['Save', :save],
  ['Exit', :shutdown],

  # Other possible commands:
  #['Equipment', :nequip],
  #['Quest Log', :quests],
  #['Formation', :nform],
  #['Load', :load],
  #['Cancel', :cancel],
  #[' ', :none],
  # :none does nothing, so it's ideal for spacers or separators.
  ]
  #-----------------------------------------------------------------------------
  # Should the gold window be shown in the item menu?
  #
  SHOW_GOLD_WINDOW = true
  #
  # Where should it be shown (to the left? set to false. right? set to true)
  GOLD_WINDOW_ALIGN_RIGHT = false
  #
  # How wide should the window be (in pixels)? 160 is the default.
  GOLD_WINDOW_WIDTH = 160
  #
  #-----------------------------------------------------------------------------
  # How many tabs are you showing? (add up the # of true values below)
  #
  TABS_SHOWN = 2
  #
  # What should the item menu show?
  SHOW_CONSUMABLES = true # i.e. normal items
  SHOW_KEY_ITEMS = true
  SHOW_WEAPONS = false
  SHOW_ARMORS = false
  #
  # Where should the item description window be?
  # 0 = top
  # 1 = between the tabs and the item selection
  # 2 = at the bottom
  DESCR_PLACEMENT = 0
  #
  #-----------------------------------------------------------------------------
 
end
 
#--------------------------------------------------------------------#
# !!! Beware of crashes and errors if you edit beyond this point !!! #
#--------------------------------------------------------------------#
 
# Overwrites the old, boring menu to use the cooler-looking Game End menu
class Scene_Map
  def call_menu
    Sound.play_ok
    SceneManager.call(Scene_End)
  end
end
 
# Overwrites how the tabs are shown in the Items Menu
class Window_ItemCategory
 
  # Changes width to allow placement of gold window.
  # If gold window doesn't exist, revert to default width.
  def window_width
    NonCombatMenu::SHOW_GOLD_WINDOW ? Graphics.width - NonCombatMenu::GOLD_WINDOW_WIDTH : Graphics.width
  end
 
  # Changes columns to fit tabs shown
  def col_max
    return NonCombatMenu::TABS_SHOWN
  end
 
  # Makes a list of commands that will be shown/hidden depending on config
  def make_command_list
    add_command(Vocab::item,     :item) if NonCombatMenu::SHOW_CONSUMABLES
    add_command(Vocab::key_item, :key_item) if NonCombatMenu::SHOW_KEY_ITEMS
    add_command(Vocab::weapon,   :weapon) if NonCombatMenu::SHOW_WEAPONS
    add_command(Vocab::armor,    :armor) if NonCombatMenu::SHOW_ARMORS
  end
 
end
 
#Makes it so the user can change the gold window width
class Window_Gold
  def window_width
    return NonCombatMenu::GOLD_WINDOW_WIDTH
  end
end
 
# Adds a gold window to the item menu & determines placement
class Scene_Item
  def start
    super
    create_help_window
   
    # Checks if the gold menu should be shown
    create_gold_window if NonCombatMenu::SHOW_GOLD_WINDOW
   
    create_category_window
    create_item_window
  end
 
  def create_category_window
    @category_window = Window_ItemCategory.new
    @category_window.viewport = @viewport
    @category_window.help_window = @help_window
   
    # Set Tab Menu's X depending on Gold existing or not
    if NonCombatMenu::SHOW_GOLD_WINDOW
      @category_window.x = NonCombatMenu::GOLD_WINDOW_WIDTH unless NonCombatMenu::GOLD_WINDOW_ALIGN_RIGHT
    end
     
    # Set description, tab menu, gold Y
    if NonCombatMenu::DESCR_PLACEMENT == 1
      @help_window.y = @category_window.height
    elsif NonCombatMenu::DESCR_PLACEMENT == 2
      @help_window.y = Graphics.height - @help_window.height
    else
      @gold_window.y = @help_window.height if NonCombatMenu::SHOW_GOLD_WINDOW
      @category_window.y = @help_window.height
    end
   
    @category_window.set_handler(:ok,     method(:on_category_ok))
    @category_window.set_handler(:cancel, method(:return_scene))
  end
 
  def create_item_window
   
    # Changes where the item window is displayed
    if NonCombatMenu::DESCR_PLACEMENT == 1
      wy = @category_window.y + @category_window.height + @help_window.height
    elsif NonCombatMenu::DESCR_PLACEMENT == 2
      wy = @category_window.height + @help_window.height
    else
      wy = @category_window.y + @category_window.height
    end
   
    wh = Graphics.height - wy
    @item_window = Window_ItemList.new(0, wy, Graphics.width, wh)
    @item_window.y = @category_window.height if NonCombatMenu::DESCR_PLACEMENT == 2
    @item_window.viewport = @viewport
    @item_window.help_window = @help_window
    @item_window.set_handler(:ok,     method(:on_item_ok))
    @item_window.set_handler(:cancel, method(:on_item_cancel))
    @category_window.item_window = @item_window
  end
 
  def create_gold_window
    @gold_window = Window_Gold.new
    # Makes the gold window (if aligned right) be under any new windows
    @gold_window.viewport = @viewport
    @gold_window.x = Graphics.width - NonCombatMenu::GOLD_WINDOW_WIDTH if NonCombatMenu::GOLD_WINDOW_ALIGN_RIGHT
  end
end
 
# Strips down the status menu to the very basics
class Window_Status
  def initialize(actor)
    super((Graphics.width - 300)/2, (Graphics.height - 120)/2, 300, 120)
    @actor = actor
    refresh
    activate
  end
  def refresh
    contents.clear
    draw_block2(line_height * 0)
  end
  def draw_basic_info(x, y)
    draw_actor_name(@actor, x, y + line_height * 0.5)
    draw_actor_hp(@actor, x, y + line_height * 1.5)
    draw_actor_mp(@actor, x, y + line_height * 2.5)
  end
end
 
# Dims the Status window's background as well~
class Scene_Status
  def create_background
    super
    @background_sprite.tone.set(0, 0, 0, 128)
  end
end
 
# Overwrites Scene_End to use Save/Load/Items
class Scene_End
  
  def start
    super
    create_command_window
    create_invisible_formation_window
  end
  
  def create_command_window
    @command_window = Window_GameEnd.new
    
    NonCombatMenu::MENU.each do |i|
      next if i[1].to_s == "cancel"
      @command_window.set_handler(i[1], method(("command_" + i[1].to_s).to_sym))
    end
    
    @command_window.set_handler(:cancel,   method(:return_scene))
  end

  def create_invisible_formation_window
    @status_window = Window_MenuStatus.new(@command_window.width, 0)
    @status_window.x = (Graphics.width - @status_window.width)/2
    @status_window.hide.deactivate
  end

  def command_item
    SceneManager.call(Scene_Item)
  end
  def command_status
    SceneManager.call(Scene_Status)
  end
  def command_save
    SceneManager.call(Scene_Save)
  end
  # Defines the load command
  def command_load
    SceneManager.call(Scene_Load)
  end
  def command_nequip
    SceneManager.call(Scene_Equip)
  end
  def command_quests
    SceneManager.call(Scene_Quest)
  end
  def command_none
    SceneManager.call(Scene_End)
  end
  
  def command_nform
    @command_window.hide.deactivate
    @status_window.select_last
    @status_window.show.activate
    @status_window.set_handler(:ok,     method(:on_formation_ok))
    @status_window.set_handler(:cancel, method(:on_formation_cancel))
  end
  
  def on_formation_ok
    if @status_window.pending_index >= 0
      $game_party.swap_order(@status_window.index,
                             @status_window.pending_index)
      @status_window.pending_index = -1
      @status_window.redraw_item(@status_window.index)
    else
      @status_window.pending_index = @status_window.index
    end
    @status_window.activate
  end
  
  def on_formation_cancel
    if @status_window.pending_index >= 0
      @status_window.pending_index = -1
      @status_window.activate
    else
      @status_window.unselect
      @status_window.hide.deactivate
      @command_window.show.activate
    end
  end
end

# Overwrites Window_End to show tabs depending on configured values
class Window_GameEnd
  def make_command_list
    NonCombatMenu::MENU.each do |i|
      i[1].to_s == "none" ? add_command(i[0], i[1], enabled = false) : add_command(i[0], i[1])
    end
  end
end

#Call the Non-Combat Menu with event commands
class Game_Interpreter
  def command_351
    return if $game_party.in_battle
    SceneManager.call(Scene_End)
    Window_MenuCommand::init_command_position
    Fiber.yield
  end
end