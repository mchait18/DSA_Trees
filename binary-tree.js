/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0
    function minDepthHelper(node) {
      if (!node.right && !node.left) return 1
      if (!node.right) return minDepthHelper(node.left) + 1
      if (!node.left) return minDepthHelper(node.right) + 1
      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
    }
    return minDepthHelper(this.root)
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0
    function maxDepthHelper(node) {
      if (!node.right && !node.left) return 1
      if (!node.right) return maxDepthHelper(node.left) + 1
      if (!node.left) return maxDepthHelper(node.right) + 1
      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
    }
    return maxDepthHelper(this.root)
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0
    let max = Number.MIN_VALUE

    function postOrder(node) {
      if (!node) return 0
      let left = Math.max(postOrder(node.left), 0)
      let right = Math.max(postOrder(node.right), 0)
      max = Math.max(max, left + right + node.val)
      return Math.max(left, right) + node.val
    }
    postOrder(this.root)
    return max
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null

    let num = Number.MAX_VALUE
    const toVisitStack = [this.root]

    while (toVisitStack.length) {
      const current = toVisitStack.pop()
      if (lowerBound < current.val) {
        num = Math.min(num, current.val)
      }
      if (current.left) toVisitStack.push(current.left)
      if (current.right) toVisitStack.push(current.right)
    }
    return num < Number.MAX_VALUE ? num : null

  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false
    let parentNode = null
    function depthHelper(node, nodeToFind) {
      parentNode = node
      // console.log("in depthHelper, node is ", node,
      //   "and nodeToFind is ", nodeToFind)
      if (node.left === nodeToFind || node.right === nodeToFind)
        // {
        // console.log("it's equal, node is ", node,
        //   " and nodeToFind is ", nodeToFind)
        return 1
      // }
      if (!node.right && !node.left) return 0
      if (node.left) return depthHelper(node.left, nodeToFind) + 1
    }

    let count1 = depthHelper(this.root, node1)
    if (count1 === 0) depthHelper(this.root.right)
    let firstParent = parentNode
    // console.log("count1 is ", count1, "firstParent is ", firstParent)
    let count2 = depthHelper(this.root, node2)
    if (count2 === 0) depthHelper(this.root.right)
    let secParent = parentNode
    // console.log("count2 is ", count2, "secParent is ", secParent)
    return (count1 === count2 && firstParent !== secParent)
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree.root) return ""
    let serializedarr = []

    function serializeNode(node) {
      node.left ? serializedarr.push(node.left.val) : serializedarr.push("null")
      node.right ? serializedarr.push(node.right.val) : serializedarr.push("null")
      if (node.left) serializeNode(node.left)
      if (node.right) serializeNode(node.right)
      return String(serializedarr)
    }
    serializedarr.push(tree.root.val)
    return serializeNode(tree.root)
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(str) {
    if (str.length === 0) return null
    let strArr = str.split(",")
    let root = new BinaryTreeNode(Number(strArr.shift()))
    let current = root
    let val
    while (strArr.length > 0) {
      val = strArr.shift()
      current.left = val === "null" ? null : new BinaryTreeNode(Number(val))
      val = strArr.shift()
      current.right = val === "null" ? null : new BinaryTreeNode(Number(val))

      if (strArr.length > 0) {
        let newCurrent = current.left
        val = strArr.shift()
        newCurrent.left = val === "null" ? null : new BinaryTreeNode(Number(val))
        val = strArr.shift()
        newCurrent.right = val === "null" ? null : new BinaryTreeNode(Number(val))
        current = current.right
      }
    }
    let myTree = new BinaryTree(root);
    return myTree;
  }


  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {

  }
}

module.exports = { BinaryTree, BinaryTreeNode };
