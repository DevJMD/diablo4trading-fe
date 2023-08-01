import loadingSpinner from '@assets/game/2DUI_LoadingWidget/1264894272.webp';
import serverTypeSeasonal from '@assets/game/2DUI_Social_ServerType/1780021540.webp';
import serverTypeEternal from '@assets/game/2DUI_Social_ServerType/395747417.webp';
import serverTypeSeasonalHardcore from '@assets/game/2DUI_Social_ServerType/470588524.webp';
import serverTypeHardcore from '@assets/game/2DUI_Social_ServerType/904762742.webp';
import { Game } from '@diablosnaps/common';

export const GAME_SERVER_TYPE_ICONS: Record<Game.ServerType, string> = {
    [Game.ServerType.Eternal]: serverTypeEternal,
    [Game.ServerType.Hardcore]: serverTypeHardcore,
    [Game.ServerType.Seasonal]: serverTypeSeasonal,
    [Game.ServerType.SeasonalHardcore]: serverTypeSeasonalHardcore,
};

export const GAME_SPINNER_ICON = loadingSpinner;