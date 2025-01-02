import { NextResponse } from "next/server";
import connectToServiceEaseDB from "@/lib/serviceDB";
import Order  from "@/models/Orders";

export async function POST(request) {
  try {
    await connectToServiceEaseDB();
    const orderData = await request.json();
    const newOrder = new Order({
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await newOrder.save();
    return NextResponse.json({ message: "Order created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectToServiceEaseDB();
    const orders = await Order.find({});
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToServiceEaseDB();
    const { id, ...updateData } = await request.json();
    updateData.updatedAt = new Date();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    
    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToServiceEaseDB();
    const { id } = await request.json();
    const deletedOrder = await Order.findByIdAndDelete(id);
    
    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
