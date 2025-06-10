import {useFeatureRecordLocalStorage} from '../../../../browser/storage';
import {injectScript} from '../../../../browser/scripting';
import {Script} from '../../../../entities';
import {ScriptListItem} from '../../../../entities';
import {useFeatureListScript} from '../../list-script';

const triggerPageMutation = async (): Promise<void> => {
    let triggerElement = document.createElement('div');
    triggerElement.setAttribute('class', '__trigger-element');
    let content = `
        <div class="__trigger-element__content">
            <div class="__trigger-element__name">
                <span>Is Running</span>
            </div>
            <div class="__trigger-element__icon">
                <i>🤣</i>
            </div>
        </div>`;
    let styles = `
        <style>
            @keyframes icon-rotate {
              to {
                transform: rotate(360deg);
              }
              from {
                transform: rotate(0);
              }
            }
            .__trigger-element__content {
                position: fixed;
                bottom: 10px;
                right: 10px;
                z-index: 99999;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #e0e0e0;
                padding: 15px;
                border-radius: 15px;
            }
            .__trigger-element__icon i {
                animation: icon-rotate 2s linear infinite;
                font-size: 15px;
            }
            .__trigger-element__name {
                margin-right: 10px;
            }
        </style>`;
    triggerElement.innerHTML = `${styles}${content}`;
    document.body.appendChild(triggerElement)
}

const removeTriggerPageMutation = async (): Promise<void> => {
    injectScript((): void => {
        document.body.querySelector('.__trigger-element')?.remove()
    })
}

const setLocationScript = async (locationScript: string) => {
    injectScript((args: unknown[]) => {
        if (typeof args[0] !== 'string') {
            return
        }
        window.location.href = args[0];
    }, () => {}, [locationScript])
}

const startRunningSavedScript = async (script: ScriptListItem): Promise<void> => {
    await useFeatureListScript.changeStatusScript(script, true);
    await setStatusRunningSaved(true);
    await setIdRunningSaved(script.id);
    await setRunningScript(script.scripts);
}

const setStatusRunningSaved = async (status: boolean): Promise<void> => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.statusRunningSaved, status)
}

const setIdRunningSaved = async (id: number): Promise<void> => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.idRunningSaved, id)
}

const setRunningScript = async (scripts: Script[]): Promise<void> => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.runningScript, scripts) // run
}

const stopRunningSavedScript = async (script: ScriptListItem): Promise<void> => {
    await useFeatureListScript.changeStatusScript(script, false)
    await setStatusRunningSaved(false);
    await setIdRunningSaved(0);
    await setRunningScript([]);
}

const runScript = async (id: number): Promise<void> => {
    let script = await useFeatureListScript.getActiveScriptById(id);
    if (!script) {
        return
    }
    await setIdRunningSaved(script.id);
    await setLocationScript(script.link);
}

const runScriptOnInitLocation = async (): Promise<void> => {
    let script = await useFeatureListScript.getActiveScriptById(
        await getIdRunningSaved()
    );
    if (typeof script === 'undefined') {
        return
    }
    await startRunningSavedScript(script);
    await triggerPageMutation();
}

const stopScript = async (id: number): Promise<void> => {
    let script = await useFeatureListScript.getActiveScriptById(id);
    if (!script) {
        return
    }
    await stopRunningSavedScript(script);
    await removeTriggerPageMutation();
}

const getIdRunningSaved = async (): Promise<number> => {
    return <number>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.idRunningSaved)
}

const stopActiveScript = async (): Promise<void> => {
    await stopScript(await getIdRunningSaved());
}

const getRunningScript = async (): Promise<Script[]> => {
    return <Script[]>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.runningScript);
}

const getStatusRunning = async (): Promise<boolean | null> => {
    return <boolean>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.statusRunning) ?? null;
}

const setStatusRunning = async (statusRunning: boolean) => {
    await useFeatureRecordLocalStorage.setLocalStorage(useFeatureRecordLocalStorage.keys.statusRunning, statusRunning)
}

const getStatusRunningSaved = async (): Promise<number> => {
    return <number>await useFeatureRecordLocalStorage.getLocalStorage(useFeatureRecordLocalStorage.keys.statusRunningSaved)
}


export const useFeatureRunScript = {
    getRunningScript,
    getStatusRunning,
    getStatusRunningSaved,
    runScript,
    runScriptOnInitLocation,
    stopScript,
    stopActiveScript,
    setStatusRunning,
    setRunningScript
}