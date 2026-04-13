import { injectLayoutGroup, provideLayoutGroup } from "./context.mjs";
import { useForceUpdate } from "./use-force-update.mjs";
import { nodeGroup } from "./group.mjs";
function useLayoutGroupProvider(props) {
  const parentGroup = injectLayoutGroup(null);
  const [forceRender, key] = useForceUpdate();
  const context = {
    id: getGroupId(props, parentGroup),
    group: getGroup(props, parentGroup),
    forceRender,
    key
  };
  provideLayoutGroup(context);
  return context;
}
function useLayoutGroup() {
  const { forceRender } = injectLayoutGroup({ forceRender: () => {
  } });
  return { forceRender };
}
function getGroupId(props, parentGroup) {
  const shouldInherit = props.inherit === true || props.inherit === "id";
  const parentId = parentGroup == null ? void 0 : parentGroup.id;
  if (shouldInherit && parentId) {
    return props.id ? `${parentId}-${props.id}` : parentId;
  }
  return props.id;
}
function getGroup(props, parentGroup) {
  const shouldInherit = props.inherit === true || props.inherit === "group";
  return shouldInherit ? (parentGroup == null ? void 0 : parentGroup.group) || nodeGroup() : nodeGroup();
}
export {
  useLayoutGroup,
  useLayoutGroupProvider
};
