async function updateSettings(dataStream, fade, mix, explicitContent, peakNormalize, bpmWarning) {

    const payload = {
        data_saver: dataStream,
        crossfade: fade,
        auto_mix: mix,
        explicit_content: explicitContent,
        bpm_normalization: peakNormalize,
        high_bpm_warning: bpmWarning
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/update_settings', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),


    });