package com.example.android.adapters;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android.R;
import com.example.android.model.Producto;

import java.util.List;

/**
 * Este es el encargado de mostrar la lista de productos dentro del RecyclerView.
 * Esto asigna los datos a acada vista.
 *
 * @author Adrian Bienvenido Morales Perdomo
 * @version 1.0.0
 */
public class ProductoAdapter extends RecyclerView.Adapter<ProductoAdapter.ViewHolder> {

    //Esta parte es detectar los clics y enviar en viar un objeto producto.
    public interface OnItemClickListener {
        void onItemClick(Producto producto);
    }

    private Context context;
    private List<Producto> listaProductos;
    private OnItemClickListener listener;

    /**
     *
     * @param context           contexto de la Activity
     * @param listaProductos    lista de productos a mostrar
     * @param listener          accion al pulsar un item
     */
    public ProductoAdapter(Context context, List<Producto> listaProductos, OnItemClickListener listener) {
        this.context = context;
        this.listaProductos = listaProductos;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.item_producto, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Producto p = listaProductos.get(position);
        holder.tvNombre.setText(p.getNombre());
        holder.tvDescripcion.setText(p.getDescripcion());
        holder.tvPrecio.setText(p.getPrecio());
        holder.imgProducto.setImageResource(p.getImagenResId());

        // Aquí se define la acción al pulsar el item (importantísimo)
        holder.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onItemClick(p);
        });
    }

    @Override
    public int getItemCount() { return listaProductos.size(); }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView imgProducto;
        TextView tvNombre, tvDescripcion, tvPrecio;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            imgProducto = itemView.findViewById(R.id.img_producto);
            tvNombre = itemView.findViewById(R.id.tv_nombre);
            tvDescripcion = itemView.findViewById(R.id.tv_descripcion);
            tvPrecio = itemView.findViewById(R.id.circulo_precio);
        }
    }
}

