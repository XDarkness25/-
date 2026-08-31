# 归念｜秩与零空间

- 学科：线性代数
- 标签：矩阵的秩、齐次线性方程组、自由变量、零空间
- 一句话收束：零空间是否含有非零向量，取决于未知数个数是否大于矩阵的秩，也就是是否存在自由变量。

## 定义和核心要点

1. **矩阵的秩**
   - 矩阵的秩是其主元个数，也等于线性无关行或列的最大数目。
   - 对 \(A\in\mathbb{R}^{m\times n}\)，有 \(\operatorname{rank}(A)\leq\min(m,n)\)。

2. **零空间**
   - \(N(A)=\{x\in\mathbb{R}^n:Ax=0\}\)。
   - 零空间一定含有零向量；只有存在自由变量时才含有非零向量。

3. **秩—零度关系**
   - \(\operatorname{rank}(A)+\operatorname{nullity}(A)=n\)。
   - 若 \(\operatorname{rank}(A)<n\)，则零度大于零，齐次方程组存在无穷多个解，其中包括非零解。

## 常见误区

1. **误区**：有自由变量就意味着主元变量被唯一确定。
   - **澄清**：给定一组自由变量的值后，主元变量才随之确定；自由变量本身可以连续取无穷多个值。

2. **误区**：齐次方程组有自由变量时只有少数几个非零解。
   - **澄清**：自由变量通常可在实数范围内连续取值，因此会产生无穷多个解。

## 例题或代码示例

### 示例 1｜计算

设
\[
A=\begin{bmatrix}1&2&3\\0&1&1\end{bmatrix}.
\]
矩阵有两个主元，而未知数有三个，因此 \(\operatorname{rank}(A)=2\)，\(\operatorname{nullity}(A)=1\)。令自由变量 \(x_3=t\)，可得
\[
x_2=-t,\qquad x_1=-t,
\]
所以
\[
x=t\begin{bmatrix}-1\\-1\\1\end{bmatrix}.
\]
当 \(t\neq0\) 时得到非零解。

## 待解决问题

1. 如何从行最简形系统地写出零空间的一组基。
2. 列空间的基为什么要回到原矩阵的主元列中选取。

<!-- YINIAN_GUIAN_V1_START -->
```json
{
  "schema_version": "yinian.guinian/v1",
  "type": "guinian",
  "title": "秩与零空间",
  "subject": {
    "discipline": "线性代数",
    "topic": "秩与零空间",
    "tags": ["矩阵的秩", "齐次线性方程组", "自由变量", "零空间"]
  },
  "one_sentence": "零空间是否含有非零向量，取决于未知数个数是否大于矩阵的秩，也就是是否存在自由变量。",
  "core_points": [
    {
      "name": "矩阵的秩",
      "statement": "矩阵的秩是主元个数。",
      "intuition": "它表示矩阵中真正独立的信息方向数。",
      "key_relation": "rank(A) <= min(m,n)"
    },
    {
      "name": "零空间",
      "statement": "N(A) 是所有满足 Ax=0 的向量组成的集合。",
      "intuition": "这些方向经过线性变换 A 后被压缩为零。",
      "key_relation": "rank(A) + nullity(A) = n"
    }
  ],
  "misconceptions": [
    {
      "mistake": "有自由变量就意味着主元变量被唯一确定。",
      "correction": "只有先给定自由变量，主元变量才随之确定。"
    },
    {
      "mistake": "自由变量只产生少数几个非零解。",
      "correction": "自由变量可连续取值，通常产生无穷多个解。"
    }
  ],
  "examples": [
    {
      "kind": "calculation",
      "title": "求二乘三矩阵的零空间",
      "prompt": "求矩阵 [[1,2,3],[0,1,1]] 的零空间。",
      "solution": "令 x3=t，则 x2=-t、x1=-t，所以 x=t[-1,-1,1]^T。",
      "language": null
    }
  ],
  "open_questions": [
    "如何从行最简形系统地写出零空间的一组基。",
    "列空间的基为什么要回到原矩阵的主元列中选取。"
  ]
}
```
<!-- YINIAN_GUIAN_V1_END -->
