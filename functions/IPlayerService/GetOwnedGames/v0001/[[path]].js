export async function onRequest(context) {
  try {
    // 从环境变量获取 API 密钥
    const STEAM_API_KEY = context.env.STEAM_API_KEY;
    console.log('STEAM_API_KEY:', STEAM_API_KEY); // 添加调试日志
    
    if (!STEAM_API_KEY) {
      return new Response('STEAM_API_KEY is not configured', { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 获取请求参数
    const { searchParams } = new URL(context.request.url);
    const steamid = searchParams.get('steamid');
    if (!steamid) {
      return new Response('steamid parameter is required', { status: 400 });
    }

    // 构建 Steam API URL（使用 HTTPS）
    const steamApiUrl = new URL('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/');
    
    // 构建查询参数对象
    const params = {
      key: STEAM_API_KEY.trim(),
      steamid: steamid.trim(),
      format: 'json'  // 默认使用 JSON 格式
    };

    // 转发其他可选参数
    const optionalParams = [
      'include_appinfo',
      'include_played_free_games',
      'format',
      'appids_filter'
    ];
    
    optionalParams.forEach(param => {
      const value = searchParams.get(param);
      if (value !== null) {
        params[param] = value;
      }
    });

    // 将所有参数添加到 URL
    Object.entries(params).forEach(([key, value]) => {
      steamApiUrl.searchParams.append(key, value);
    });

    // 打印完整请求信息（仅用于调试，生产环境请移除）
    console.log('Request Details:', {
      url: steamApiUrl.toString().replace(STEAM_API_KEY, 'HIDDEN_KEY'),
      params: { ...params, key: 'HIDDEN_KEY' }
    });

    // 调用 Steam API
    const response = await fetch(steamApiUrl.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // 添加响应内容调试
    const responseText = await response.text();
    console.log('Steam API Response:', responseText);
    
    // 如果状态码不是 200，返回详细错误信息
    if (!response.ok) {
      return new Response(responseText, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // 返回成功响应
    return new Response(responseText, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}