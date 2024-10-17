import {useFeatureRecordLocalStorage} from '../../../../chrome/storage';
import {injectScript} from '../../../../chrome/scripting/model/injectScript';
import {ScriptItem} from '../../record-script/model/script';

const storage = useFeatureRecordLocalStorage;

const triggerPageMutation = async () => {
    injectScript(() => {
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
        let styles = `<style>
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
    })
}

const removeTriggerPageMutation = async () => {
    injectScript(() => {
        document.body.querySelector('.__trigger-element')?.remove()
    })
}

const getSavedScripts = async (): Promise<ScriptItem[] | []> => {
  return await storage.getLocalStorage(storage.keys.savedScripts) ?? []
}

const getActiveScriptById = async (id: number): Promise<ScriptItem | undefined> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return undefined
    }
    return scripts.find(item => item && item.id === id);
}

const getActiveScriptIndexById = async (id: number): Promise<number> => {
    let scripts = await getSavedScripts();
    if (scripts.length === 0) {
        return -1
    }
    return scripts.findIndex(item => item.id === id);
}

const changeStatusScript = async (script: ScriptItem, status: boolean) => {
    let newScripts = await getSavedScripts();
    if (newScripts.length === 0) {
        return
    }
    let index = await getActiveScriptIndexById(script.id);
    if (index < 0) {
        return
    }
    newScripts[index].isRunning = status;
    await storage.setLocalStorage(storage.keys.savedScripts, newScripts)
}

const startRunningSavedScript = async (script: ScriptItem) => {
    await changeStatusScript(script, true)
    await storage.setLocalStorage(storage.keys.statusRunningSaved, true)
    await storage.setLocalStorage(storage.keys.idRunningSaved, script.id)
    await storage.setLocalStorage(storage.keys.runningScript, script.scripts)
}

const stopRunningSavedScript = async (script: ScriptItem) => {
    await changeStatusScript(script, false)
    await storage.setLocalStorage(storage.keys.statusRunningSaved, false)
    await storage.setLocalStorage(storage.keys.idRunningSaved, null)
    await storage.setLocalStorage(storage.keys.runningScript, [])
}

const runScript = async (id: number) => {
    let script = await getActiveScriptById(id);
    if (!script) {
        return
    }
    await startRunningSavedScript(script);
    await triggerPageMutation();
}

const stopScript = async (id: number) => {
    let script = await getActiveScriptById(id);
    if (!script) {
        return
    }
    await stopRunningSavedScript(script);
    await removeTriggerPageMutation();
}

const stopActiveScript = async () => {
    await stopScript(await storage.getLocalStorage(storage.keys.idRunningSaved));
}

export const useFeatureRunScript = {
    runScript,
    stopScript,
    stopActiveScript
}